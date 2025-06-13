// app/blog/[id]/page.js
import NotionClientRenderer from '@/app/components/NotionRenderer';

import 'react-notion-x/src/styles.css';
// make codes colourful
import 'prismjs/themes/prism-tomorrow.css';
import { NotionAPI } from 'notion-client';

export default async function BlogDetail({ params }) {

  // Without this:
  // Error: Route "/projects/[id]" used `params.id`. `params` should be awaited before using its properties. 
  // Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis at NotionPage (app/projects/[id]/page.js:13:48)
  params = await params;

  const notion = new NotionAPI();
  const recordMap = await notion.getPage(params.id);

  console.log(params.id);

  return (
    <div>
      <NotionClientRenderer recordMap={recordMap} />
    </div>
  );
}
