import { validateEmail, validateEmpty, validateLength } from "@/utils/helpers/validationHelper"

export const loginValidation: any = {
    username: {
        rules: [
            {
                validation: (value:any) => validateEmpty(value),
                message: 'El usuario es obligatorio.'
            },
            {
                validation: (value:any) => validateLength(value, 3),
                message: 'El usuario requiere al menos tres caracteres.'
            },
            {
                validation: (value:any) => validateEmail(value),
                message: 'El usuario debe ser un correo válido.'
            }
        ]
    },
    password: {
        rules: [
            {
                validation: (value:any) => validateEmpty(value),
                message: 'El password es obligatorio.'
            },
            {
                validation: (value:any) => validateLength(value, 3),
                message: 'El password requiere al menos tres caracteres.'
            }
        ]
    }
}