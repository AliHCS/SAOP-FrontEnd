import Swal from "sweetalert2";
import { RouteParamsRaw, useRouter } from "vue-router";

export const useAlert = () => {
  const router = useRouter();

  interface routeParams {
    name: string;
    params: RouteParamsRaw;
  }
  const showMessage = (
    message: string,
    type: any = "success",
    timer: number = 2000
  ) => {
    Swal.fire({
      position: "top-end",
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: timer,
    });
  };
  const showAlertSuccess = (message: string, timer?: number) => {
    showMessage(message, "success", timer);
  };
  const showAlertError = (message: string, timer?: number) => {
    showMessage(message, "error", timer);
  };

  const showAlertWarning = (message: string, timer?: number) => {
    showMessage(message, "warning", timer);
  };

  const showAlertInfo = (message: string, timer?: number) => {
    showMessage(message, "info", timer);
  };

  const showConfirm = (message: string, params: routeParams | any = false) => {
    Swal.fire({
      title: "Aviso",
      text: message,
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        if (params != false) {
          router.push({ name: params.name, params: params.params });
        } else {
          window.history.back();
        }
      }
    });
  };

  return {
    showAlertSuccess,
    showAlertError,
    showAlertWarning,
    showAlertInfo,
    showConfirm,
  };
};

export default useAlert;
