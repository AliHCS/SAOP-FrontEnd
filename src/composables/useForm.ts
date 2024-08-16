import { onMounted, ref, watch } from "vue";


export const useForm = (initialForm: any, formValidation: any = {}) => {
    const formState: any = ref({});

    const isValid = ref<boolean>(false)
    const errors = ref<any>({})
    const isPristine = ref<any>({})


    watch(
        initialForm,
        () => {
            formState.value = initialForm;
            validateFields()
        },
        {
            deep: true,
        }
    );
    onMounted(() => {
        formState.value = initialForm;
        const keys = Object.keys(initialForm).length;
        if (keys > 0) {
            setPristine()
            validateFields()
        }

    });

    const validateFields = () => {
        const keys = Object.keys(initialForm)
        for (let key of keys) {

            if (isPristine.value[key] && !initialForm[key]) { continue }
            else { isPristine.value[key] = false }

            if(formValidation[key]){
                const rules = formValidation[key].rules
                for (let rule of rules) {
                    const isValidRule = rule.validation(initialForm[key])
                    if (isValidRule) {
                        const auxErrors: any = { ...errors.value }
                        delete auxErrors[key]
                        errors.value = auxErrors
                    } else {
                        const auxErrors: any = { ...errors.value }
                        auxErrors[key] = rule.message
                        errors.value = {
                            ...auxErrors
                        }
                        break
                    }
                }
            }
        }
        isValid.value = checkForm()
    }

    const showErrors = () => {
        const keys = Object.keys(initialForm)
        for (let key of keys) {

            if(formValidation[key]){
                const rules = formValidation[key].rules
                for (let rule of rules) {
                    const isValidRule = rule.validation(initialForm[key])
                    if (isValidRule) {
                        const auxErrors: any = { ...errors.value }
                        delete auxErrors[key]
                        errors.value = auxErrors
                    } else {
                        const auxErrors: any = { ...errors.value }
                        auxErrors[key] = rule.message
                        errors.value = {
                            ...auxErrors
                        }
                        break
                    }
                }
            }
        }
    }

    const checkForm = () => {
        let isValidForm = true
        const keys = Object.keys(formValidation)
        for (let key of keys) {
            const rules = formValidation[key].rules
            for (let rule of rules) {
                const isValidRule = rule.validation(initialForm[key])
                if (!isValidRule) {
                    isValidForm = false
                }
            }
        }
        return isValidForm
    }


    const setPristine = () => {
        const keys = Object.keys(initialForm)
        for (let key of keys) {
            isPristine.value[key] = true
        }
    }

    return {
        formState,
        isValid,
        errors,
        showErrors,
    };
};
