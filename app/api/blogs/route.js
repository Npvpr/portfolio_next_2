// app/api/notion/route.js

import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { languages } from 'prismjs';

const notion = new Client({
  auth: process.env.NOTION_TOKEN, // ⚠️ Keep secret in production
});

const databaseId = process.env.NOTION_BLOGS_DATABASE_ID;

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Order',
          direction: 'descending',
        },
      ],
    });

    const result = response.results.map((page) => ({
      id: page.properties["Id"].rich_text[0]?.text?.content,
      title: page.properties["Title"].title[0]?.text?.content,
      description: page.properties["Description"].rich_text[0]?.text?.content,
      image: page.properties["Image"].files[0]?.file?.url || "",
      tags: page.properties["Tags"].multi_select.map(tag => tag.name),
      lastupdated: page.properties["Last Updated"].date?.start || null,
    }));

    // console.log(response);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
