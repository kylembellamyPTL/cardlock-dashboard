'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function HomePage() {
  useEffect(() => {
    async function testSupabase() {
      const { data, error } = await supabase.from('test_table').select('*').limit(1);
      console.log('Supabase test data:', data, 'error:', error);
    }

    testSupabase();
  }, []);

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
        Next.js app on Vercel with Supabase configured.
      </p>
    </main>
  );
}
