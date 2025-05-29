'use client';

import { useEffect, useState } from 'react';

export default function NotionPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchNotionData() {
      try {
        const res = await fetch('/api/notion');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Fetch failed:', err);
      }
    }
    fetchNotionData();
  }, []);

  return (
    <div>
      <h2>Fetched from Notion:</h2>
      {data.length === 0 && <p>Loading...</p>}
      {data.map((item, i) => (
        <div key={i}>
          <p>👤 {item.name} - {item.role}</p>
          {item.image && <img src={item.image} alt={item.name} width={100} />}
        </div>
      ))}
    </div>
  );
}
