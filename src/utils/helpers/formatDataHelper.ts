export const sortedByField = (data: any[], campo: string) => {
  return data.sort((a, b) => {
    if (a[campo] < b[campo]) {
      return -1;
    }
    if (a[campo] > b[campo]) {
      return 1;
    }
    return 0;
  });
};

export const obtenerDescripcion = (dataArray: any[], id: string | number) => {
  const item = dataArray.find((item) => item.id === id); // Convertir a string para la comparación
  return item ? item.descripcion : "";
};
