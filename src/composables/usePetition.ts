import { ref } from "vue";
import { makeRequest } from "@/api/api";
import { getToken } from "@/utils/helpers/authenticationHelper";
import { CATALOGO_DEFAULTS } from "@/utils/constants/catalogue";
import { paginate } from "@/utils/helpers/paginationHelper";
import { exportFile } from "@/utils/helpers/exportFileHelper";
import useAlert from "./useAlert";

export const usePetition = (ENDPOINT: String) => {
  const { showAlertSuccess, showAlertWarning } = useAlert();
  const arrayData = ref({ ...CATALOGO_DEFAULTS });

  const getDatas = async (options: any) => {
    const { size, page, ...datas } = options;

    try {
      arrayData.value.loading = true;
      const response = await makeRequest(
        `${ENDPOINT}`,
        "GET",
        {},
        {
          page: page,
          page_size: size > 0 ? size : arrayData.value.pagination.page_size,
          ...datas,
        }
      );
      arrayData.value.data = response.results;
      arrayData.value.pagination = paginate(
        arrayData.value.pagination,
        page,
        response.count
      );
      arrayData.value.loading = false;
      return Promise.resolve(response.results);
    } catch (error: any) {
      showAlertWarning(error);
      return Promise.reject(error);
    }
  };

  const searchData = async (options: any) => {
    const { page, page_size, ...datas } = options;
    // console.log("searchData -> datas", datas);
    try {
      arrayData.value.loading = true;
      const response = await makeRequest(
        `${ENDPOINT}`,
        "GET",
        {},
        {
          page: page,
          ...datas,
          page_size: page_size
            ? page_size
            : arrayData.value.pagination.page_size,
        }
      );

      arrayData.value.data = response.results;
      arrayData.value.pagination = paginate(
        arrayData.value.pagination,
        page,
        response.count
      );
      arrayData.value.loading = false;
      return Promise.resolve(response.results);
    } catch (error: any) {
      showAlertWarning(error);
      return Promise.reject(error);
    }
  };

  const getData = async (clave: string) => {
    try {
      const response = await makeRequest(`${ENDPOINT}${clave}/`, "GET");
      return Promise.resolve(response);
    } catch (error: any) {
      return Promise.resolve(null);
    }
  };

  const getDataOutMesageModal = async (clave: string) => {
    try {
      const response = await makeRequest(`${ENDPOINT}${clave}/`, "GET");
      return Promise.resolve(response);
    } catch (error: any) {
      return Promise.reject(error);
    }
  };

  const deleteData = async (clave: string) => {
    try {
      const response = await makeRequest(`${ENDPOINT}${clave}/`, "DELETE");
      showAlertSuccess("Registro eliminado correctamente");
      return Promise.resolve(response);
    } catch (err: any) {
      showAlertWarning(err);
      return Promise.reject(err);
    }
  };

  const updateData = async (data: any) => {
    try {
      const response = await makeRequest(
        `${ENDPOINT}${data.id ? data.id : data.clave}/`,
        "PUT",
        data
      );
      showAlertSuccess("Cambios guardados correctamente");
      return Promise.resolve(response);
    } catch (err: any) {
      showAlertWarning(err, 3500);
      return Promise.reject(err);
    }
  };

  const createData = async (body: any) => {
    try {
      const response = await makeRequest(`${ENDPOINT}`, "POST", body);
      showAlertSuccess("Datos guardados correctamente");
      return Promise.resolve(response);
    } catch (err: any) {
      showAlertWarning(err, 3500);
      return Promise.reject(err);
    }
  };

  const exportData = async (type: string, cat: string) => {
    try {
      const response = await makeRequest(`doc/${ENDPOINT}${type}`, "GET");
      exportFile(response, `${cat}.${type}`);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const exportDoc = async (id: string, name: string, extraParams?: string) => {
    try {
      const id_search = id.length > 0 ? id : "";
      const queryParams = extraParams ? `?${extraParams}` : "";
      const response = await makeRequest(
        `${ENDPOINT}${id_search.length > 0 ? "/" : ""
        }${id_search}${queryParams}`,
        "GET"
      );
      exportFile(response, `${name}`);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const importFromExcel = async (formData: FormData) => {
    try {
      const token = getToken();
      const response = await fetch(
        `${import.meta.env.VITE_API}${ENDPOINT}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      return Promise.resolve(response);
    } catch (err: any) {
      console.log(err);

      return Promise.reject(err);
    }
  };

  const createFromData = async (formData: FormData) => {
    const token = getToken(); // obtenemos el token
    try {
      const response = await fetch(import.meta.env.VITE_API + ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token as string}`, // Asegúrate de que haya un Bearer antes de tu token
        },
        body: formData,
      });
      // Verificar si la respuesta es exitosa
      if (response.ok) {
        // La solicitud fue exitosa
        showAlertSuccess("Datos guardados correctamente");
      } else {
        // La solicitud no fue exitosa, manejar el error aquí
        const errorMessage = `Error en la solicitud: ${response.status} - ${response.statusText}`;
        showAlertWarning(errorMessage);
      }
    } catch (error) {
      // Manejar errores
      showAlertWarning(error as string);
    }
  };

  const updateFromData = async (formData: FormData, id: string) => {
    const token = getToken(); // obtenemos el token
    try {
      const response = await fetch(
        import.meta.env.VITE_API + ENDPOINT + id + "/",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token as string}`, // Asegúrate de que haya un Bearer antes de tu token
          },
          body: formData,
        }
      );
      // Verificar si la respuesta es exitosa
      if (response.ok) {
        // La solicitud fue exitosa
        showAlertSuccess("Datos actualizados correctamente");
      } else {
        // La solicitud no fue exitosa, manejar el error aquí
        const errorMessage = `Error en la solicitud: ${response.status} - ${response.statusText}`;
        showAlertWarning(errorMessage);
      }
    } catch (error) {
      // Manejar errores
      showAlertWarning(error as string);
    }
  };

  const customPetition = async <T>(
    method: string = "GET",
    data: T | null = null,
    params: string = "",
    query: string = "",
    responseType: string = "json" // Tipo de respuesta esperado: 'json' o 'blob'
  ): Promise<any> => {
    const token = getToken();
    const url = `${import.meta.env.VITE_API}${ENDPOINT}${params}${
      query ? "?" + query : ""
    }`;

    const options: RequestInit = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    if (data && method !== "GET") {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        if (responseType === "blob") {
          return await response.blob();
        } else {
          try {
            return await response.json();
          } catch (e) {
            return null;
          }
        }
      } else {
        const errors = JSON.parse(await response.text());
        const firstErrorKey = Object.keys(errors)[0];
        const error = errors[firstErrorKey];
        console.log(error);
        const errorMessage =
          Array.isArray(error) && error.length
            ? error.join(" | ")
            : `Error en la solicitud: ${response.status} - ${response.statusText}`;
        showAlertWarning(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      if (error instanceof Error) {
        showAlertWarning(error.message);
        throw error;
      } else {
        const unknownError = "Error desconocido";
        showAlertWarning(unknownError);
        throw new Error(unknownError);
      }
    }
  };

  return {
    arrayData,
    getDatas, //valores dinamicos { page = 1 }
    deleteData,
    updateData,
    getData,
    getDataOutMesageModal,
    createData,
    searchData, //valores dinamicos {page: page, search: term}
    exportData, //valores dinamicos,
    createFromData,
    updateFromData,
    customPetition,

    importFromExcel,
    exportDoc
  };
};

export default usePetition;
