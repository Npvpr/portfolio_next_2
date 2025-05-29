// app/api/notion/route.js

import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_TOKEN, // ⚠️ Keep secret in production
});

const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Order',
          direction: 'ascending',
        },
      ],
    });

    const result = response.results.map((page) => ({
      id: page.properties.Id.rich_text[0]?.text?.content,
      name: page.properties.Name.title[0]?.text?.content,
      role: page.properties.Role.rich_text[0]?.text?.content,
      image: page.properties.Image.files[0]?.file?.url || "",
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
