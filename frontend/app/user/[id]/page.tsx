// Next.js 15+ syntax: params is a Promise
interface Props {
  params: Promise<{ id: string }>;
}

export default async function UserProfile({ params }: Props) {
  // Await the params to extract the ID
  const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="border p-10 rounded-xl shadow-lg bg-white">
        <h1 className="text-2xl font-bold mb-4">User Profile 👤</h1>
        
        <div className="text-left space-y-2">
          <p className="text-lg">
            User ID: <span className="font-mono bg-blue-100 px-2 py-1 rounded text-blue-700">{id}</span>
          </p>
          <p className="text-gray-500">
            This page is dynamically generated based on the URL parameter.
          </p>
        </div>

        <div className="mt-8 pt-4 border-t">
          <a href="/dashboard" className="text-blue-500 hover:underline">
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}