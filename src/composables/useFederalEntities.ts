import { ref } from "vue"
import { getRequest, postRequest, putRequest } from "@/api"
import { CATALOGO_DEFAULTS } from "@/utils/constants/catalogue"
import { paginate } from '@/utils/helpers/paginationHelper'
import { deleteRequest } from "@/api/api"
import useAlert from "./useAlert"
import usePetition from "@/composables/usePetition";

const { arrayData: paises, getDatas } = usePetition("cat_pais/");

const ENDPOINT = 'cat_entidad_federativa/'

export const useFederalEntities = () => {
    const {showAlertSuccess,showAlertWarning} = useAlert();
    const federalEntities = ref(CATALOGO_DEFAULTS)

    const getFederalEntities = async ({ page = 1 }) => {
        try {
            federalEntities.value.loading = true
            const response = await getRequest(`${ENDPOINT}`, { page: page, page_size: federalEntities.value.pagination.page_size })
            await getDatas({ page: 1 })
            response.results.map((item:any) => {
                let pais:any = paises.value.data.find((pais:any) => item.pais == pais.id)
                item.nombre_pais = pais ? pais.nombre_oficial : ''
                return item
            })
            federalEntities.value.data= response.results
            federalEntities.value.pagination = paginate(federalEntities.value.pagination, page, response.count)
            federalEntities.value.loading = false
            return Promise.resolve(response.results)
        }
        catch (error) {
            console.error(error)
            console.log("Error al cargar las entidades federativas", error)
            return Promise.reject(error)
        } 
    }

    const searchFederalEntities = async (term:string = '', page: number = 1) => {
        try {
            federalEntities.value.loading = true
            const response = await getRequest(`${ENDPOINT}`, { page: page, search: term, page_size: federalEntities.value.pagination.page_size })
            federalEntities.value.data= response.results
            federalEntities.value.pagination = paginate(federalEntities.value.pagination, page, response.count)
            federalEntities.value.loading = false
            return Promise.resolve(response.results)
        }
        catch (error) {
            console.error(error)
            console.log("Error al buscar las entidades federativas", error)
            return Promise.reject(error)
        } 
    }

    const getFederalEntityById = async (id:any) => {
        try {
            const response = await getRequest(`${ENDPOINT}${id}/`)
            return Promise.resolve(response)
        }
        catch (error) {
            console.error(error)
            console.log("Error al cargar entidad federativa", error)
            return Promise.reject(error)
        }
    }

    const saveFederalEntity = async (data:any) => {
        try {
            const response = await postRequest(ENDPOINT, data)
            showAlertSuccess("Registro guardado correctamente");
            return Promise.resolve(response)
        }
        catch(err:any) {
            console.error(err)
            showAlertWarning(err) 
            console.log('Error al guardar la nueva entidad federativa', err)
            return Promise.reject(err)
        } 
    }

    const deleteFederalEntity = async (id:any) => {
        try {
            const response = await deleteRequest(`${ENDPOINT}`, id)
            showAlertSuccess("Registro eliminado correctamente");
            return Promise.resolve(response)
        }
        catch(err:any) {
            console.error(err)
            showAlertWarning(err) 
            console.log('Error al eliminar la entidad federativa', err)
            return Promise.reject(err)
        } 
    }

    const updateFederalEntity = async (data:any) => {
        console.log(data)
        try {
            const response = await putRequest(`${ENDPOINT}`, data.clave, data)
            showAlertSuccess("Registro actualizado correctamente");
            return Promise.resolve(response)
        }
        catch(err:any) {
            console.error(err)
            showAlertWarning(err) 
            console.log('Error al guardar la nueva entidad federativa', err)
            return Promise.reject(err)
        } 
    }

    return {
        federalEntities, 

        getFederalEntities,
        saveFederalEntity,
        getFederalEntityById,
        updateFederalEntity,
        deleteFederalEntity,
        searchFederalEntities
    }
}

export default useFederalEntities