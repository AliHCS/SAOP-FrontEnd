import { getURLPlantillaCargaMasiva } from "@/utils/helpers/applicationHelper";

export const exportFile = (response: Blob, nombre: string) => {
  // For other browsers:
  // Create a link pointing to the ObjectURL containing the blob.
  const data = window.URL.createObjectURL(response);

  const link = document.createElement("a");
  link.href = data;
  link.download = `${nombre}`;

  // this is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );

  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(data);
    link.remove();
  }, 100);
};

export const downloadTemplateDoc = async (fileName: string) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No se encontró el token de autorización");
    }

    const url = `${getURLPlantillaCargaMasiva}${fileName}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al descargar el archivo");
    }

    const blob = await response.blob();
    const urlBlob = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", fileName); // Usar el nombre del archivo proporcionado
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error al descargar el archivo:", error);
  }
};
