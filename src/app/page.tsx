'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type StationWeightedPrice = {
  station_id: number;
  site_name: string | null;
  site_number: string | null;
  weighted_unl_price: number | null;
  weighted_mid_price: number | null;
  weighted_pre_price: number | null;
  weighted_dsl_price: number | null;
};

export default function StationsPage() {
  const [rows, setRows] = useState<StationWeightedPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('station_weighted_prices')
        .select('*')
        .order('station_id', { ascending: true });

      if (error) {
        console.error(error);
        setError(error.message);
      } else {
        setRows((data ?? []) as StationWeightedPrice[]);
      }

      setLoading(false);
    }

    load();
  }, []);

  return (
    <main style={{ minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
        Stations
      </h1>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '1200px' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem', textAlign: 'left' }}>
                  Station ID
                </th>
                <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem', textAlign: 'left' }}>
                  Site Name
                </th>
                <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem', textAlign: 'left' }}>
                  Site Number
                </th>
                <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem', textAlign: 'right' }}>
                  UNL
                </th>
                <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem', textAlign: 'right' }}>
                  MID
                </th>
                <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem', textAlign: 'right' }}>
                  PRE
                </th>
                <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem', textAlign: 'right' }}>
                  DSL
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.station_id}>
                  <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>
                    {r.station_id}
                  </td>
                  <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>
                    {r.site_name ?? '-'}
                  </td>
                  <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>
                    {r.site_number ?? '-'}
                  </td>
                  <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem', textAlign: 'right' }}>
                    {r.weighted_unl_price != null ? r.weighted_unl_price.toFixed(4) : '-'}
                  </td>
                  <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem', textAlign: 'right' }}>
                    {r.weighted_mid_price != null ? r.weighted_mid_price.toFixed(4) : '-'}
                  </td>
                  <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem', textAlign: 'right' }}>
                    {r.weighted_pre_price != null ? r.weighted_pre_price.toFixed(4) : '-'}
                  </td>
                  <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem', textAlign: 'right' }}>
                    {r.weighted_dsl_price != null ? r.weighted_dsl_price.toFixed(4) : '-'}
                  </td>
                </tr>
              ))}

              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '0.75rem', textAlign: 'center', color: '#777' }}>
                    No data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
