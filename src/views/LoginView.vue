<template>
    <div class="container-login100">
      <Transition name="login">
        <div v-if="showLogin" class="wrap-login100">
          <h4 class="title-login app-pointer">
            {{ APP_TITLE }} <span class="app-desc">{{ APP_DESCRIPTION }}</span>
          </h4>
          <div class="pl-5 pr-5">
            <hr class="red" />
          </div>
          <form class="login100-form">
            <div v-if="error" class="alert alert-danger mb-4" role="alert">
              {{ message }}
            </div>
            <div class="col-md-12 p-0">
              <label for="usuario" class="form-label">Usuario</label>
              <input
                type="email"
                id="usuario"
                v-model="loginForm.username"
                class="form-control"
                autocomplete="off"
                placeholder="Nombre de usuario"
              />
              <small class="app-validation" v-if="errors && errors.username">{{
                errors.username
              }}</small>
            </div>
            <div class="col-md-12 p-0">
              <label for="password" class="form-label">Contraseña</label>
              <input
                type="password"
                v-model="loginForm.password"
                id="password"
                class="form-control"
                autocomplete="off"
                placeholder="Contraseña"
              />
              <small class="app-validation" v-if="errors && errors.password">{{
                errors.password
              }}</small>
            </div>
            <div class="forgot-pass">
              <a href="#"> ¿Ha olvídado tu contraseña? </a>
            </div>
            <div className="buttons-login text-end">
              <button class="btn btn-primary" type="button" @click="handleLogin">
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </Transition>
      <Transition name="login-message">
        <div class="login-message" v-if="!showLogin">
          Iniciando Sesión. Espere...
        </div>
      </Transition>
    </div>
  </template>
  <script setup lang="ts">
  import { reactive, ref, onMounted } from "vue";
  import { useAuthenticationStore } from "@/store/authenticationStore";
  import router from "@/router";
  import { APP_DESCRIPTION, APP_TITLE } from "@/utils/constants/application";
  import { useFormValidation } from "@/composables/useFormValidation";
  import { loginValidation } from "@/utils/validations/loginValidations";
  import { defaultValues, ILogin } from "@/utils/models/loginModel";
  
  const authStore = useAuthenticationStore();
  const error = ref(false);
  const message = ref("");
  const showLogin = ref(false);
  
  const loginForm = reactive<ILogin>(defaultValues);
  
  const { isValid, errors } = useFormValidation(loginForm, loginValidation);
  
  const handleLogin = () => {
    if (isValid.value) {
      showLogin.value = false;
      authStore
        .login(loginForm.username, loginForm.password)
        .then((response) => {
          if (response) {
            router.push({ name: "HomePage" });
          } else {
            router.push({ name: "login" });
          }
        })
        .catch(() => {
          showLogin.value = true;
          error.value = true;
          message.value =
            "Hubo un problema al iniciar sesión. Favor de verificar sus credenciales e intentar de nuevo.";
          router.push({ name: "login" });
        });
    }
  };
  
  onMounted(() => {
    showLogin.value = true;
  });
  </script>
  <style lang="scss" scoped>
  .buttons-login {
    margin-top: 20px;
  
    button {
      width: 100%;
    }
  }
  
  .login-message {
    color: white;
    font-weight: bold;
  }
  
  .forgot-pass a {
    color: #212223;
    font-size: 14px;
    font-weight: normal;
  }
  
  .forgot-pass a:hover {
    text-decoration: none;
  }
  
  .container-login100 {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    margin-bottom: 3rem;
    margin-top: 3rem;
    //  z-index: 1031;
    //  padding: 2rem;
    //  height: 100vh;
    top: 0;
    //  position: fixed;
    // background-image: url("@/assets/images/login-background4.jpg");
    //    background-image: linear-gradient(to bottom, #10312b, #133931, #174038, #1a483e, #1e5045, #22594d, #276254, #2b6b5c, #327767, #388372, #3f8f7d, #469c88);
    // background-image: linear-gradient(to right, #235b4e, #1f5347, #1b4b41, #17433a, #143b34, #143b34, #143b34, #143b34, #17433a, #1b4b41, #1f5347, #235b4e);
  }
  
  .login100-form {
    background: #fff;
    width: 90%;
    max-width: 540px;
    margin: 0 auto;
    padding: 5rem;
    border-radius: 4px;
    margin-bottom: 2rem;
    user-select: none;
  }
  
  .login100-form-title {
    font-size: 28px;
    color: #fff;
    line-height: 1.2;
    text-align: center;
    text-transform: uppercase;
    display: block;
  }
  
  .wrap-login100 {
    width: 540px;
    overflow: hidden;
    background: transparent;
    box-shadow: 3px 3px 4px 4px rgba(0, 0, 0, 0.3);
    background-color: white;
    position: relative;
    border-radius: 5px;
    padding-top: 3rem;
    .app-desc {
      color: #b38e5d;
    }
  }
  
  .title-login {
    text-align: center;
    color: #000;
  }
  
  .login-enter-active {
    transition: top 1s ease-in-out, opacity 1.5s ease-in-out;
  }
  
  .login-enter-to {
    top: 0px;
    opacity: 1;
  }
  
  .login-enter-from {
    top: -666px;
    opacity: 0;
  }
  
  .login-leave-active {
    transition: opacity 0s ease-in-out;
  }
  
  .login-leave-to {
    opacity: 0;
  }
  
  .login-leave-from {
    opacity: 1;
  }
  
  .login-message-enter-from {
    opacity: 0;
  }
  
  .login-message-enter-to {
    opacity: 1;
  }
  
  .login-message-enter-active {
    transition: opacity 1.5s ease-in;
  }
  .login-message-leave-from {
    opacity: 1;
  }
  .login-message-leave-to {
    opacity: 0;
  }
  
  .login-message-leave-active {
  }
  </style>
  