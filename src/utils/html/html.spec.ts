const timeout = 5000
let page

import { validateHTML, removeExecutedScripts, renderizeHtml } from './'

const validHtml =
    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><h1>Hello World</h1></body></html>'

describe('Validate HTML tests ', () => {
    it('Should check if html is valid, --success case', () => {
        expect(validateHTML({ html: validHtml })).toBe(undefined)
    })
})

describe('RemoveExecutedScripts tests ', () => {
    beforeAll(async () => {
        page = await globalThis.__BROWSER_GLOBAL__.newPage()
        await page.goto('https://google.com')
    }, timeout)

    it('Should check if script is removed, --success case', async () => {
        removeExecutedScripts({ page })
        const response = await page.content()

        expect(response).not.toContain('body')
        expect(response).not.toContain('head')
    })
})

describe('RenderizeHtml tests ', () => {
    beforeAll(async () => {
        page = await globalThis.__BROWSER_GLOBAL__.newPage()
        await page.goto('https://google.com')
    }, timeout)
    it('Should check if html is added, --success case', async () => {
        const { response } = await renderizeHtml({ html: validHtml, page })

        expect(response).toMatch(validHtml)
    })
})
