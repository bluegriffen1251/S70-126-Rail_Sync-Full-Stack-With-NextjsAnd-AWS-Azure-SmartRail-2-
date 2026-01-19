'use server'

export async function getTrains() {
  console.log("Fetching trains from backend..."); // Helpful for debugging

  try {
    // 1. Fetch from your Express Backend
    const response = await fetch('http://127.0.0.1:8000/api/trains', {
      method: 'GET',
      cache: 'no-store', // Ensures we don't serve stale data
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 2. Check for errors
    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    // 3. Parse JSON
    const data = await response.json();
    return data; // This should be your array of trains

  } catch (error) {
    console.error("Failed to fetch trains:", error);
    return []; // Return empty array on failure so UI doesn't crash
  }
}