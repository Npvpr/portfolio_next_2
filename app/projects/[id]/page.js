import { getNotionPage } from '@/data/notion';
import NotionClientRenderer from '@/app/components/NotionRenderer';

import 'react-notion-x/src/styles.css';

export default async function NotionPage({ params }) {
  const recordMap = await getNotionPage(params.id);

  return (
    <div className="p-4">
      <NotionClientRenderer recordMap={recordMap} />
    </div>
  );
}