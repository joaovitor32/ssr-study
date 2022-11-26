import puppeteer, { Page } from 'puppeteer'

import { HTMLToRenderProps, StartPageProps } from '../../types'

const renderHtmlExternalURL = async ({ page, parameter }: HTMLToRenderProps<Page>) => {
    await page.goto(parameter, {
        timeout: 30000,
        waitUntil: 'networkidle2'
    })

    const html = await page.content()

    return html
}

const startPage = async ({ browserWSEndpoint }: StartPageProps) => {
    const browser = await puppeteer.connect({ browserWSEndpoint })

    const page = await browser.newPage()
    return { page }
}

const launchPage = async () => {
    const browser = await puppeteer.launch({ headless: true })
    const browserWSEndpoint = await browser.wsEndpoint()
    const { page } = await startPage({ browserWSEndpoint })
    return { page, browser }
}

export { renderHtmlExternalURL, launchPage, startPage }
