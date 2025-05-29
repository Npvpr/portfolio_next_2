'use client';

import { NotionRenderer } from 'react-notion-x';
import dynamic from 'next/dynamic';

const Code = dynamic(() => import('react-notion-x/build/third-party/code').then(m => m.Code));

export default function NotionClientRenderer({ recordMap }) {
  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={false}
      darkMode={true}
      components={{
        Code,
      }}
    />
  );
}