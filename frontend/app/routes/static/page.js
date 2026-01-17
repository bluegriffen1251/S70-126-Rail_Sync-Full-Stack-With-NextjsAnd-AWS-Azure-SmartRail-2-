// smartcommute/app/about/page.js
import React from 'react';

// SSG: Force static rendering
export const dynamic = 'force-static';

export default function AboutPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">About RailSync</h1>
      <p className="mt-4">
        RailSync helps millions of Indians travel better. 
        This page is statically generated (SSG) because our mission statement doesn't change daily.
      </p>
      <p className="text-sm text-gray-500 mt-4">
        Build Time: {new Date().toLocaleString()} (This won't change on refresh)
      </p>
    </div>
  );
}