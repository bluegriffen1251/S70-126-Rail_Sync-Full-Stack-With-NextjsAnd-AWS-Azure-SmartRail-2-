import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleError } from '@/lib/errorHandler';
import { AppError } from '@/lib/AppError';
import redis from '@/lib/redis'; // <--- Import your Redis connection

export async function GET(req: Request) {
  try {
    const userRole = req.headers.get("x-user-role");

    // 1. Pagination logic
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // 2. GENERATE DYNAMIC CACHE KEY
    // We include page/limit so Page 1 doesn't overwrite Page 2
    const cacheKey = `users:page:${page}:limit:${limit}`;

    // 3. CHECK REDIS (Cache Strategy: Cache-Aside)
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      console.log(`🚀 Cache HIT for ${cacheKey}`);
      // If found, return cached data immediately (Fast!)
      return NextResponse.json(JSON.parse(cachedData));
    }

    // 4. CACHE MISS - Fetch from Database (Slow)
    console.log(`🐌 Cache MISS for ${cacheKey} - Fetching from DB`);
    
    const data = await prisma.user.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        role: true, 
        createdAt: true,
      }
    });

    const total = await prisma.user.count();

    // Construct the full response object
    const response = {
      success: true,
      currentUserRole: userRole,
      pagination: { page, limit, total },
      data: data
    };

    // 5. STORE IN REDIS
    // TTL (Time-To-Live) set to 60 seconds ("EX", 60)
    await redis.set(cacheKey, JSON.stringify(response), "EX", 60);

    return NextResponse.json(response);

  } catch (error) {
    return handleError(error, "GET /api/users");
  }
}

// Admin-only User Creation
export async function POST(req: Request) {
  try {
    // 1. SECURITY CHECK
    const userRole = req.headers.get("x-user-role");
    if (userRole !== 'ADMIN') {
      throw new AppError("Access Denied: Admins only.", 403);
    }

    const body = await req.json();

    // 2. VALIDATION CHECK
    if (!body.email || !body.password || !body.name) {
      throw new AppError("Missing required fields: name, email, or password", 400);
    }

    const newData = await prisma.user.create({
      data: body,
    });

    // 3. CACHE INVALIDATION
    // Since the data changed, all cached pages are now "stale" (outdated).
    // We find all keys starting with "users:page:" and delete them.
    const keys = await redis.keys("users:page:*");
    if (keys.length > 0) {
      await redis.del(keys);
      console.log(`🧹 Cache Invalidated: Deleted ${keys.length} page(s)`);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Created successfully', 
      data: newData 
    }, { status: 201 });

  } catch (error) {
    return handleError(error, "POST /api/users");
  }
}