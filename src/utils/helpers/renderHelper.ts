
export const renderBoolean = (data:boolean) => {
    return (data == true) ? '<span class="text-success bi bi-check-circle"></span><p class="etiqueta"> Sí</p>' : '<span class="text-danger bi bi-x-circle"></span><p class="etiqueta">No</p>';
}

export const renderString = (data:string) => {
    return data.toUpperCase()
}

export const renderNumber = (data:number) => {
    return data
}

export const render = (data:any) => {
    const type = typeof data
    let response;
    switch(type) {
        case 'boolean':
            response = renderBoolean(data)
            break
        case 'number':
            response = renderNumber(data)
            break
        case 'string':
            response = renderString(data)
            break
        default:
            response = ''
            break
    }
    return response
}