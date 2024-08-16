import { LOADER_DELAY } from '@/utils/constants/application'
import { clearToken, getToken, isAuthenticated } from '@/utils/helpers/authenticationHelper'
import { useApplicationStore } from '@/store/applicationStore'
import { IFetch, defaultValues } from '@/utils/models/fetchModel'
import { getBaseURL, logRequestError, sleep } from '@/utils/helpers/applicationHelper'

const defaultConfig: IFetch = {...defaultValues}
const baseURL:string = getBaseURL()

/**
 * 
 * MÉTODO PARA REALIZAR PETICIONES AL BACKEND
 * ADJUNTANDO EL HEADER DE AUTORIZACIÓN
 * Y GESTIONANDO EL COMPONENTE LOADER Y LAS CREDENCIALES.
 * 
 * @author Gildardo Solis <gildardo.gs5@gmail.com>
 * @param {string} url url del recurso
 * @param {string} method método por el cual se realizará la petición
 * @param {any} body cuerpo de la petición
 * @return {any} response data
 * 
 */
export const makeRequest = async (
    url: string,
    method: string,
    body: any = {},
    params: any = {},
    isAutocomplete?: boolean
  ): Promise<any> => { //NOSONAR
    const appStore = useApplicationStore();
    try {
      if (!isAutocomplete) appStore.initTransaction();
  
      let config: any = { ...defaultConfig };
      config.method = method;
  
      if (isAuthenticated()) {
        config.headers["Authorization"] = `Bearer ${getToken()}`;
      }
  
      if (Object.keys(body).length > 0) {
        config.body = JSON.stringify(body);
      }
  
      const query = Object.keys(params)
        .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
        .join("&");
  
      const fullPath = Object.keys(params).length > 0 ? `${url}?` + query : url;
  
      const response = await fetch(`${baseURL + fullPath}`, config);
  
      if (response.status >= 500) {
        throw new Error(
          `Ocurrió un error en la petición. Por favor, contacte al administrador del sistema.`
        );
      }
      if (response.status === 400) {
        const dataJson = await response.json();
        if (dataJson.reporte_id) {
          throw new Error(dataJson.reporte_id);
        } else if (dataJson.non_field_errors) {
          throw new Error(dataJson.non_field_errors);
        } else if (
          typeof dataJson === "object" &&
          Object.keys(dataJson).length > 0
        ) {
          Object.fromEntries(
            Object.entries(dataJson).map(([key, value]) => {
              throw new Error(`${key}: ${value}`);
            })
          );
        }
      }
  
      if (
        response.status >= 400 &&
        response.status !== 401 &&
        response.status < 500
      ) {
        const dataJson = await response.json();
        if (dataJson.detail) {
          throw new Error(dataJson.detail);
        }
        throw new Error(
          `Ocurrió un error en la petición. Por favor, contacte al administrador del sistema.`
        );
      }
  
      if (response.status === 401) {
        clearToken();
        throw new Error(`Please, check your credentials and try again.`);
      }
  
      const isJSON = response.headers.get("content-type") === "application/json";
      const headerContentType = response.headers.get("content-type");
      if (
        headerContentType == "application/force-download" ||
        headerContentType == "application/vnd.ms-excel" || 
        headerContentType == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        headerContentType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        if (!isAutocomplete) appStore.endTransaction();
        return response.blob();
      }
  
      const data = isJSON ? await response.json() : {};
      await sleep(LOADER_DELAY);
  
      if (!isAutocomplete) appStore.endTransaction();
  
      return Promise.resolve(data);
    } catch (error) {
      if (!isAutocomplete) appStore.endTransaction();
      logRequestError(url, method, body, params, error);
      return Promise.reject(error);
    }
  };

/**
 * Wrapper para peticiones GET
 * 
 * @author Gildardo Solis <gildardo.gs5@gmail.com>
 * @param {string} url url del recurso 
 * @param {any} params query string 
 * @returns {any} response data
 */
export const getRequest = (url:string, params:any = {}): Promise<any> => makeRequest(url, 'GET', {}, params)

/**
 * Wrapper para peticiones POST
 * 
 * @author Gildardo Solis <gildardo.gs5@gmail.com>
 * @param {string} url url del recurso 
 * @param {any} body cuerpo de la petición
 * @returns {any} response data
 */
export const postRequest = (url = '', body = {}): Promise<any> => makeRequest(url, 'POST', body)

/**
 * Wrapper para peticiones PUT
 * 
 * @author Gildardo Solis <gildardo.gs5@gmail.com>
 * @param {string} url url del recurso 
 * @param {string} id identificador del recurso
 * @param {any} body cuerpo de la petición
 * @returns {any} response data
 */
export const putRequest = (url:string, id:string, body:any): Promise<any> => makeRequest(`${url}${id}/`, 'PUT', body)

/**
 * Wrapper para peticiones DELETE
 * 
 * @author Gildardo Solis <gildardo.gs5@gmail.com>
 * @param {string} url url del recurso 
 * @param {string} id identificador del recurso
 * @param {any} body cuerpo de la petición
 * @returns {any} response data
 */
export const deleteRequest = (url:string, id:string): Promise<any> => makeRequest(`${url}${id}/`, 'DELETE', {}, {})