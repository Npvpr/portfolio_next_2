import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_CONTACT_DATABASE_ID;

export async function POST(req) {
    try {
        const { name, email, message } = await req.json();

        await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                Name: {
                    title: [
                        {
                            text: { content: name },
                        },
                    ],
                },
                Email: {
                    email: email,
                },
                Message: {
                    rich_text: [
                        {
                            text: { content: message },
                        },
                    ],
                },
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to save contact message:", error);
        return NextResponse.json({ success: false, error: "Failed to save message" }, { status: 500 });
    }
}
