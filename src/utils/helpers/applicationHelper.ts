export const getBaseURL = () => {
  return import.meta.env.VITE_API || "http://localhost:8080/";
};

export const getURLPlantillaCargaMasiva = import.meta.env
  .VITE_DOWNLOAD_TEMPLATES;

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const logRequestError = (
  url: string,
  method: string,
  data: any,
  params: any,
  error: any
) => {
  if (
    import.meta.env.MODE === "development" ||
    import.meta.env.MODE === "testing" ||
    import.meta.env.MODE === "local"
  ) {
    console.log("-----------------BEGIN INFO------------------");
    console.log(`url => `, url);
    console.log(`method =>`, method);
    console.log(`data => `, data);
    console.log(`params => `, params);
    console.log("-------------------END INFO-------------------");
    console.error(error);
  }
  if (import.meta.env.MODE === "production" && error) {
    console.log(
      `There was problem processing your request. Check with the sys admin.`
    );
  }
};
