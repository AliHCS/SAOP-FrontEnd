import { ref } from "vue"
import { getRequest, postRequest, putRequest } from "@/api"
import { CATALOGO_DEFAULTS } from "@/utils/constants/catalogue"
import { paginate } from '@/utils/helpers/paginationHelper'
import { deleteRequest } from "@/api/api"
import useAlert from "./useAlert"

const ENDPOINT = 'cat_factibilidad/'

export const useFeasibility = () => {
    const {showAlertSuccess,showAlertWarning} = useAlert();
    const feasibility = ref(CATALOGO_DEFAULTS)

    const getFeasibilities = async ({ page = 1 }) => {
        try {
            feasibility.value.loading = true
            const response = await getRequest(`${ENDPOINT}`, { page: page, page_size: feasibility.value.pagination.page_size })
            feasibility.value.data= response.results
            feasibility.value.pagination = paginate(feasibility.value.pagination, page, response.count)
            feasibility.value.loading = false
            console.log(response)
            return Promise.resolve(response.results)
        }
        catch (error) {
            console.error(error)
            console.log("Error al cargar las factibilidades", error)
            return Promise.reject(error)
        } 
    }

    const searchFeasibilities = async (term:string = '', page: number = 1) => {
        try {
            feasibility.value.loading = true
            const response = await getRequest(`${ENDPOINT}`, { page: page, search: term, page_size: feasibility.value.pagination.page_size })
            feasibility.value.data= response.results
            feasibility.value.pagination = paginate(feasibility.value.pagination, page, response.count)
            feasibility.value.loading = false
            return Promise.resolve(response.results)
        }
        catch (error) {
            console.error(error)
            console.log("Error al las factibilidades", error)
            return Promise.reject(error)
        } 
    }

    const getFeasibilityById = async (id:any) => {
        try {
            const response = await getRequest(`${ENDPOINT}${id}/`)
            return Promise.resolve(response)
        }
        catch (error) {
            console.error(error)
            console.log("Error al cargar factibilidad", error)
            return Promise.reject(error)
        }
    }

    const saveFeasibility = async (data:any) => {
        try {
            const response = await postRequest(ENDPOINT, data)
            showAlertSuccess("Registro guardado correctamente");
            return Promise.resolve(response)
        }
        catch(err:any) {
            console.error(err)
            showAlertWarning(err) 
            console.log('Error al guardar la nueva factibilidad', err)
            return Promise.reject(err)
        } 
    }

    const deleteFeasibility = async (id:any) => {
        try {
            const response = await deleteRequest(`${ENDPOINT}`, id)
            showAlertSuccess("Registro eliminado correctamente");
            return Promise.resolve(response)
        }
        catch(err:any) {
            console.error(err)
            showAlertWarning(err) 
            console.log('Error al eliminar la factibilidad', err)
            return Promise.reject(err)
        } 
    }

    const updateFeasibility = async (data:any) => {
        console.log(data)
        try {
            const response = await putRequest(`${ENDPOINT}`, data.clave, data)
            showAlertSuccess("Registro actualizado correctamente");
            return Promise.resolve(response)
        }
        catch(err:any) {
            console.error(err)
            showAlertWarning(err) 
            console.log('Error al guardar la nueva factibilidad', err)
            return Promise.reject(err)
        } 
    }

    return {
        feasibility, 

        getFeasibilities,
        saveFeasibility,
        getFeasibilityById,
        updateFeasibility,
        deleteFeasibility,
        searchFeasibilities
    }
}

export default useFeasibility