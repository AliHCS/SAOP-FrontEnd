export interface IFetch {
    mode: string
    cache: string
    credentials: string
    headers: any,
    method: string
}

export const defaultValues: IFetch = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'GET',
}