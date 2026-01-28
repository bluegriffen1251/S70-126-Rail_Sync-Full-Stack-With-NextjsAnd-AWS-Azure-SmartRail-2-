import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { cookies } from "next/headers"; 
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rail Sync App",
  description: "Real-Time Train Intelligence",
};

// Helper to decode JWT payload without external libraries
function getUserFromToken(tokenString: string | undefined) {
  if (!tokenString) return null;
  try {
    const payloadBase64 = tokenString.split('.')[1];
    if (!payloadBase64) return null;
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
    return JSON.parse(decodedJson);
  } catch (e) {
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  
  const user = getUserFromToken(token?.value);
  const isLoggedIn = !!user;
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <nav className="flex items-center justify-between p-4 bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-xl font-bold text-blue-600 hover:opacity-80 transition flex items-center gap-2">
              <span>🚄</span> Rail Sync
            </Link>
            
            {isLoggedIn && (
              <div className="hidden md:flex gap-4 text-sm font-medium text-gray-600">
                <Link href="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
              </div>
            )}
          </div>
          
          <div>
            {isLoggedIn ? (
              // ✅ LINK UPDATED: Now points to /profile
              <Link href="/profile" className="flex items-center gap-3 group">
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-gray-500 font-medium">Welcome back</p>
                  <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition">
                    {user.name || "User"}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold shadow-sm group-hover:shadow-md transition">
                  {getInitials(user.name || "User")}
                </div>
              </Link>
            ) : (
              <Link 
                href="/login" 
                className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm"
              >
                Login
              </Link>
            )}
          </div>
        </nav>

        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}