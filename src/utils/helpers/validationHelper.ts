export const validateEmail = (value:any) => {
    const regex = new RegExp("^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$")
    return regex.test(value)
}

export const validateEmpty = (value: any) => value && value.length > 0

export const validateLength = (value:any, len: number) => value && value.length >= len
