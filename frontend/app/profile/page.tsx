"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper: Decode JWT Manually
  const getUserFromToken = () => {
    const token = Cookies.get("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return { ...payload, token }; // Return payload + raw token
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const userData = getUserFromToken();
    if (!userData) {
      router.push("/login");
      return;
    }
    setUser(userData);

    // Fetch My Bookings
    fetch("http://localhost:8000/api/bookings", {
      headers: { Authorization: `Bearer ${userData.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [router]);

  const handleLogout = () => {
    Cookies.remove("token"); // Delete cookie
    router.push("/login"); // Redirect
    router.refresh(); // Refresh to update Navbar
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* 1. Header Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold border-4 border-white shadow-md">
              {user.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500">{user.email}</p>
              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Role: {user.role || "Passenger"}
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="px-6 py-2 border border-red-200 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition"
          >
            Log Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 2. Account Details */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Account Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Member Since</span>
                  <span className="font-medium">Jan 2026</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Total Trips</span>
                  <span className="font-medium">{bookings.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Account Status</span>
                  <span className="text-green-600 font-bold">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Booking History */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Your Journey History</h2>
                <Link href="/dashboard" className="text-blue-600 text-sm hover:underline">
                  Book New Ticket →
                </Link>
              </div>

              {isLoading ? (
                <div className="text-center py-10 text-gray-400">Loading history...</div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500 mb-4">No bookings found.</p>
                  <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                    Book your first trip
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-900">{booking.train.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {booking.train.source} → {booking.train.destination}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(booking.date).toLocaleDateString()} • Seat {booking.seatNumber}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}