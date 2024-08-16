import { ref } from "vue"
import { getRequest, postRequest, putRequest } from "@/api"
import { CATALOGO_DEFAULTS } from "@/utils/constants/catalogue"
import { paginate } from '@/utils/helpers/paginationHelper'
import { deleteRequest } from "@/api/api"
import useAlert from "./useAlert"

const ENDPOINT = 'cat_nivel_area/'

export const useLevelsByArea = () => {
    const {showAlertSuccess,showAlertWarning} = useAlert();
    const levelsByArea = ref(CATALOGO_DEFAULTS)

    const getLevelsByArea = async ({ page = 1 }) => {
        try {
            levelsByArea.value.loading = true
            const response = await getRequest(`${ENDPOINT}`, { page: page, page_size: levelsByArea.value.pagination.page_size })
            levelsByArea.value.data= response.results
            levelsByArea.value.pagination = paginate(levelsByArea.value.pagination, page, response.count)
            levelsByArea.value.loading = false
            return Promise.resolve(response.results)
        }
        catch (error) {
            console.error(error)
            console.log("Error al cargar los niveles por area", error)
            return Promise.reject(error)
        } 
    }

    const searchLevelsByArea = async (term:string = '', page: number = 1) => {
        try {
            levelsByArea.value.loading = true
            const response = await getRequest(`${ENDPOINT}`, { page: page, search: term, page_size: levelsByArea.value.pagination.page_size })
            levelsByArea.value.data= response.results
            levelsByArea.value.pagination = paginate(levelsByArea.value.pagination, page, response.count)
            levelsByArea.value.loading = false
            return Promise.resolve(response.results)
        }
        catch (error) {
            console.error(error)
            console.log("Error al cargar puestos", error)
            return Promise.reject(error)
        } 
    }

    const getLevelByAreaById = async (id:any) => {
        try {
            const response = await getRequest(`${ENDPOINT}${id}/`)
            return Promise.resolve(response)
        }
        catch (error) {
            console.error(error)
            console.log("Error al cargar nievel por area", error)
            return Promise.reject(error)
        }
    }

    const saveLevelByArea = async (data:any) => {
        try {
            const response = await postRequest(ENDPOINT, data)
            showAlertSuccess("Registro guardado correctamente");
            return Promise.resolve(response)
        }
        catch(err:any) {
            console.error(err)
            showAlertWarning(err) 
            console.log('Error al guardar el nuevo nievel por area', err)
            return Promise.reject(err)
        } 
    }

    const deleteLevelByArea = async (id:any) => {
        try {
            const response = await deleteRequest(`${ENDPOINT}`, id)
            showAlertSuccess("Registro eliminado correctamente");
            return Promise.resolve(response)
        }
        catch(err:any) {
            console.error(err)
            showAlertWarning(err) 
            console.log('Error al eliminar el nivel por area', err)
            return Promise.reject(err)
        } 
    }

    const updateLevelByArea = async (data:any) => {
        console.log(data)
        try {
            const response = await putRequest(`${ENDPOINT}`, data.clave, data)
            showAlertSuccess("Registro actualizado correctamente");
            return Promise.resolve(response)
        }
        catch(err:any) {
            showAlertWarning(err) 
            console.error(err)
            console.log('Error al guardar el nuevo nievel por area', err)
            return Promise.reject(err)
        } 
    }

    return {
        levelsByArea, 

        getLevelsByArea,
        saveLevelByArea,
        getLevelByAreaById,
        updateLevelByArea,
        deleteLevelByArea,
        searchLevelsByArea
    }
}

export default useLevelsByArea