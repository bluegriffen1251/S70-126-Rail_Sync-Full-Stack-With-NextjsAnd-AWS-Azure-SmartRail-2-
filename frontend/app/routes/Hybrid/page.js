export const revalidate = 60;

export default async function HybridPage() {
  const res = await fetch("https://dummyjson.com/comments/random", {
    next: { revalidate: 60 },
  });

  const data = await res.json();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Hybrid Page (ISR)</h1>
      <p>This page uses Incremental Static Regeneration.</p>

      <h2>Random Comment:</h2>
      <p>{data.body}</p>
    </div>
  );
}
