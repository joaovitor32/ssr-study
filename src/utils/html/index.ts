import { JSDOM } from 'jsdom'
import path from 'path'
import fs from 'fs'

import { Page } from 'puppeteer'

import {
    ValidateHTMLProps,
    HTMLToRenderProps,
    RemoveExecutedScriptsProps,
    RenderizeHtmlProps,
    ParseHTMLProps
} from '../../types'

import Error from '../../error'

const validateHTML = ({ html }: ValidateHTMLProps) => {
    const dom = new JSDOM(html)
    const errorNode = dom.window.document.querySelector('parsererror')
    if (errorNode) {
        throw new Error('Invalid html file', 500)
    }
}

const renderHtmlFromFile = ({ parameter }: HTMLToRenderProps<Page>) => {
    const filePathName = path.resolve(__dirname, parameter)

    return fs.readFileSync(filePathName, 'utf8')
}

const removeExecutedScripts = async ({ page }: RemoveExecutedScriptsProps<Page>) => {
    await page.evaluate(() => {
        const elements = document.querySelectorAll('script, link[rel="import"]')
        const head = document.querySelector('head')
        const body = document.querySelector('body')

        head?.remove()
        body?.remove()
        elements.forEach(e => e.remove())
    })
}

const renderizeHtml = async ({ html, page }: RenderizeHtmlProps<Page>) => {
    await page.setContent(html)
    const response = await page.content()
    await page.close()

    return { response }
}

const parseHtml = async ({ page, html }: ParseHTMLProps<Page>) => {
    validateHTML({ html })
    await removeExecutedScripts({ page })
}

export { validateHTML, renderHtmlFromFile, renderizeHtml, parseHtml }
