'use client'

import { useState } from 'react';

export default function BookButton({ trainId }: { trainId: number }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleBook = async () => {
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('http://localhost:8000/api/trains/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          trainId, 
          userId: 1 // Hardcoded user for now (from seed)
        }),
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Booking failed');
      
      setMessage('✅ Booking Successful! Seat confirmed.');
      // Refresh page to update seat count
      window.location.reload(); 

    } catch (error) {
      // FIX: Use type guard instead of 'any'
      if (error instanceof Error) {
        setMessage(`❌ Error: ${error.message}`);
      } else {
        setMessage('❌ An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleBook}
        disabled={loading}
        className={`px-6 py-2 rounded-lg text-white font-bold transition ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Processing...' : 'Book Seat'}
      </button>
      {message && <p className="mt-2 text-sm font-semibold">{message}</p>}
    </div>
  );
}