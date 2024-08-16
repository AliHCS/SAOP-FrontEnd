import { ref } from "vue"
import { getRequest, postRequest, putRequest } from "@/api"
import { CATALOGO_DEFAULTS } from "@/utils/constants/catalogue"
import { paginate } from '@/utils/helpers/paginationHelper'
import { deleteRequest } from "@/api/api"
import useAlert from "./useAlert"

const ENDPOINT = 'cat_estatus/'

export const useStatus = () => {
    const {showAlertSuccess,showAlertWarning} = useAlert();
    const status = ref(CATALOGO_DEFAULTS)

    const getStatus = async ({ page = 1 }) => {
        try {
            status.value.loading = true
            const response = await getRequest(`${ENDPOINT}`, { page: page, page_size: status.value.pagination.page_size })
            status.value.data= response.results
            status.value.pagination = paginate(status.value.pagination, page, response.count)
            status.value.loading = false
            console.log(response)
            return Promise.resolve(response.results)
        }
        catch (error) {
            console.error(error)
            console.log("Error al cargar los estatus", error)
            return Promise.reject(error)
        } 
    }

    const searchStatus = async (term:string = '', page: number = 1) => {
        try {
            status.value.loading = true
            const response = await getRequest(`${ENDPOINT}`, { page: page, search: term, page_size: status.value.pagination.page_size })
            status.value.data= response.results
            status.value.pagination = paginate(status.value.pagination, page, response.count)
            status.value.loading = false
            return Promise.resolve(response.results)
        }
        catch (error) {
            console.error(error)
            console.log("Error al los estatus", error)
            return Promise.reject(error)
        } 
    }

    const getStatusById = async (id:any) => {
        try {
            const response = await getRequest(`${ENDPOINT}${id}/`)
            return Promise.resolve(response)
        }
        catch (error) {
            console.error(error)
            console.log("Error al cargar estatus", error)
            return Promise.reject(error)
        }
    }

    const saveStatus = async (data:any) => {
        try {
            const response = await postRequest(ENDPOINT, data)
            showAlertSuccess("Registro guardado correctamente");
            return Promise.resolve(response)
        }
        catch(err:any) {
            console.error(err)
            showAlertWarning(err) 
            console.log('Error al guardar el nuevo estatus', err)
            return Promise.reject(err)
        } 
    }

    const deleteStatus = async (id:any) => {
        try {
            const response = await deleteRequest(`${ENDPOINT}`, id)
            showAlertSuccess("Registro eliminado correctamente");
            return Promise.resolve(response)
        }
        catch(err:any) {
            console.error(err)
            showAlertWarning(err) 
            console.log('Error al eliminar el estatus', err)
            return Promise.reject(err)
        } 
    }

    const updateStatus = async (data:any) => {
        console.log(data)
        try {
            const response = await putRequest(`${ENDPOINT}`, data.clave, data)
            showAlertSuccess("Registro actualizado correctamente");
            return Promise.resolve(response)
        }
        catch(err:any) {
            console.error(err)
            showAlertWarning(err) 
            console.log('Error al guardar el nuevo estatus', err)
            return Promise.reject(err)
        } 
    }

    return {
        status, 

        getStatus,
        saveStatus,
        getStatusById,
        updateStatus,
        deleteStatus,
        searchStatus
    }
}

export default useStatus