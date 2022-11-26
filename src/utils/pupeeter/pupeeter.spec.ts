import { Page, Browser } from 'puppeteer'
import { launchPage, renderHtmlExternalURL } from './'

let page
const timeout = 30000

jest.useFakeTimers()

describe('Lauch pupeeter tests ', () => {
    it('Should launch page, --success case', async () => {
        const { page, browser } = await launchPage()
        expect(page).toBeInstanceOf(Page)
        expect(browser).toBeInstanceOf(Browser)
    })
})

describe('RenderHtmlExternalURL tests ', () => {
    it(
        'Should render html, --success case',
        async () => {
            jest.setTimeout(timeout)

            page = await globalThis.__BROWSER_GLOBAL__.newPage()
            const html = await renderHtmlExternalURL({ page, parameter: 'https://g1.globo.com/' })
            expect(html).toContain('body')
        },
        timeout
    )
})
