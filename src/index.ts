import express, { Response, Request } from 'express'

import ssr, { renderHtmlFromFile, renderHtmlExternalURL } from './ssr'

const port = 8000
const app = express()

app.listen(port, () => console.log(`I listen on http://localhost:${port}`))

app.use((_, res: Response, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/ssr', async (_, res: Response) => {
    const filePath = '../../file/index.ejs'

    const { html, status } = await ssr({ htmlToRender: renderHtmlFromFile, parameter: filePath })

    return res.status(status).send(html)
})

app.get('/ssr/external', async (req: Request, res: Response) => {
    const url = req.query.url as string

    const { html, status } = await ssr({ htmlToRender: renderHtmlExternalURL, parameter: url })

    return res.status(status).send(html)
})
