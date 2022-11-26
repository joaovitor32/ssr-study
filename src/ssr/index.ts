import { Page } from 'puppeteer'

import Error from '../error'

import { parseHtml, renderizeHtml, renderHtmlFromFile } from '../utils/html'
import { renderHtmlExternalURL, launchPage } from '../utils/pupeeter'

import { SSRFileProps, SSRResponse } from '../types'

const ssr = async ({ htmlToRender, parameter }: SSRFileProps<Page>): Promise<SSRResponse> => {
    try {
        const { page, browser } = await launchPage()

        const html = await htmlToRender({ parameter, page })

        await parseHtml({ page, html })

        const { response } = await renderizeHtml({ html, page })

        await browser.close()

        return { status: 200, html: response }
    } catch (err) {
        console.log(err)
        throw new Error('An error occurred on browser launch', 500)
    }
}

export { renderHtmlFromFile, renderHtmlExternalURL }

export default ssr
