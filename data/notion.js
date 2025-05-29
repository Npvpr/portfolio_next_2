import { NotionAPI } from 'notion-client';

const notion = new NotionAPI();

export async function getNotionPage(pageId) {
  return await notion.getPage(pageId);
}