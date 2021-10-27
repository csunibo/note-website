import type {Document} from "mongodb"

export type mongoResponse = {
    code: number,
    message: {
        data: Document,
        error?: never
    } | {
        error: string,
        data?: never
    }
}