export default function HomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      }}
    >
      <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Cardlock Dashboard</h1>
      <p style={{ marginTop: '0.5rem', color: '#555' }}>
        Next.js app running on Vercel (browser-only setup).
      </p>
    </main>
  );
}
