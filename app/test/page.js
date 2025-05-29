import * as React from 'react'
import { NotionRenderer } from 'react-notion-x'

import { NotionAPI } from 'notion-client'

const notion = new NotionAPI()

const recordMap = await notion.getPage('067dd719a912471ea9a3ac10710e7fdf')


export default function testPage({ recordMap }){

    return (
        <div>
            <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
        </div>
    );

}