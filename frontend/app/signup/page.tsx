"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! Please login.");
        router.push("/login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md border border-gray-200">
        {/* ADDED: text-gray-900 to make it black */}
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Create an Account
        </h2>
        
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {/* ADDED: text-gray-900 */}
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Name
            </label>
            <input
              name="name"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700 font-semibold"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}