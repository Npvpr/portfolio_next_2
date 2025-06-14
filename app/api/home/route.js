// app/api/notion/route.js

import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { languages } from 'prismjs';

const notion = new Client({
  auth: process.env.NOTION_TOKEN, // ⚠️ Keep secret in production
});

const databaseId = process.env.NOTION_HOME_DATABASE_ID;

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId
    });

    const result = response.results.map((page) => ({
      name: page.properties["Name"].title[0]?.text?.content,
      file: page.properties["File"].files[0]?.file?.url || "",
    }));

    // console.log(response);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
