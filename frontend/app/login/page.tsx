"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie"; // Import js-cookie

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // NOTE: Ensure this matches your actual Backend URL
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // 🚨 CRITICAL FIX: Set cookie so Middleware can see it
        // 'expires: 7' means it lasts for 7 days
        Cookies.set("token", data.token, { expires: 7, path: '/' });

        console.log("Login successful, token set in cookies");
        
        // Refresh router to ensure Middleware runs again
        router.refresh();
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        router.push("/dashboard");
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to connect to server. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-blue-900">Rail Sync 🚆</h1>
          <h2 className="mt-2 text-xl font-semibold text-gray-700">Welcome Back</h2>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="user@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              onChange={handleChange}
              value={form.email}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              onChange={handleChange}
              value={form.password}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 text-white font-bold rounded-lg transition shadow-md ${
              isLoading 
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
            }`}
          >
            {isLoading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:text-blue-800 font-semibold hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}