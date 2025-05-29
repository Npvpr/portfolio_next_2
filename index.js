const { Client } = require('@notionhq/client');

const notion = new Client({ auth: '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' }); // <-- paste token here

const databaseId = '2005b1c9508a808bb7e8ec18714ab637';

async function readRows() {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  for (let page of response.results) {
    const name = page.properties.Name.title[0]?.text?.content;
    const role = page.properties.Role.rich_text[0]?.text?.content;
    const image = page.properties.Image.files[0]?.file?.url;
    console.log(`👤 ${name} - ${role} - ${image}`);
  }
}

readRows();
