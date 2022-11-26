export interface HTMLToRenderProps<T> {
    page: T
    parameter: string
}

export interface SSRFileProps<T> {
    parameter: string
    htmlToRender: ({ parameter, page }: HTMLToRenderProps<T>) => string | Promise<string>
}

export interface SSRResponse {
    html: string
    status: number
}

export interface StartPageProps {
    browserWSEndpoint: string
}

export interface ValidateHTMLProps {
    html: string
}

export interface RemoveExecutedScriptsProps<T> {
    page: T
}

export interface RenderizeHtmlProps<T> {
    html: string
    page: T
}

export interface ParseHTMLProps<T> {
    html: string
    page: T
}
