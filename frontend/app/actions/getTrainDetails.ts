'use server'

export async function getTrainDetails(trainIdOrNumber: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  try {
    const res = await fetch(`${apiUrl}/api/trains/${trainIdOrNumber}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Error fetching train details:", error);
    return null;
  }
}