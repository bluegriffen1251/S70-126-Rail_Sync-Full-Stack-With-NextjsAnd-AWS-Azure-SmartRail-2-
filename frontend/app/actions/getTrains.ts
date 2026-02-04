'use server'

export async function getTrains() {
  // 👇 Ensure this port matches your running backend (8000)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  console.log(`📡 Fetching trains from: ${apiUrl}/api/trains`);

  try {
    const res = await fetch(`${apiUrl}/api/trains`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`❌ Backend Error: ${res.status} ${res.statusText}`);
      return [];
    }

    return await res.json();

  } catch (error) {
    console.error("❌ Connection Failed:", error);
    return [];
  }
}