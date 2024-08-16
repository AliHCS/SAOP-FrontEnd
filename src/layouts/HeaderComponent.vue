<template>
  <nav
    fixed="top"
    class="navbar navbar-expand-md navbar-dark bg-light sub-navbar navbar-fixed-top"
  >
    <div class="options-bar container">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'HomePage' }">
            Inicio
          </router-link>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            @click="toggleScheduleModuleMenu"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Procedimiento de contratación
          </a>
          <ul
            class="dropdown-menu catalogue-dropdown"
            v-show="showScheduleModuleMenu"
          >
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-procedimiento-contrataciones' }"
                @click="toggleScheduleModuleMenu"
              >
                Adm. Procedimiento
              </router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            @click="toggleScheduleModuleMenu"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Módulo de programación
          </a>
          <ul
            class="dropdown-menu catalogue-dropdown"
            v-show="showScheduleModuleMenu"
          >
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-proyecto_de_inversion' }"
                @click="toggleScheduleModuleMenu"
              >
                Cartera de inversión
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-presupuestoEgreso' }"
                @click="toggleScheduleModuleMenu"
              >
                Presupuesto de Egreso
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-trabajos' }"
                @click="toggleScheduleModuleMenu"
              >
                Trabajos
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-E7' }"
                @click="toggleScheduleModuleMenu"
              >
                E7
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-trabajos_previos' }"
                @click="toggleScheduleModuleMenu"
              >
                Trabajos Previos
              </router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            @click="toggleCatalogueMenu"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Catálogos
          </a>
          <ul
            class="dropdown-menu menu-width catalogue-dropdown"
            v-show="showCatalogueMenu"
          >
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-tipo-obra' }"
                @click="toggleCatalogueMenu"
              >
                Tipo de obras
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-prioridades' }"
                @click="toggleCatalogueMenu"
              >
                Prioridades
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-niveles-area' }"
                @click="toggleCatalogueMenu"
              >
                Niveles por area
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-cat_tipoProyecto' }"
                @click="toggleCatalogueMenu"
              >
                Tipo de proyectos
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-cat_tipoDocumento' }"
                @click="toggleCatalogueMenu"
              >
                Tipo de documentos
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-estatus-proyecto' }"
                @click="toggleCatalogueMenu"
              >
                Estatus de proyecto
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-factibilidad-obra' }"
                @click="toggleCatalogueMenu"
              >
                Factibilidad de obra
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-cat_Fase' }"
                @click="toggleCatalogueMenu"
              >
                Fase
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-cat_Pais' }"
                @click="toggleCatalogueMenu"
              >
                País
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-entidad-federativa' }"
                @click="toggleCatalogueMenu"
              >
                Entidad federativa
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-cat_unidad_responsable' }"
                @click="toggleCatalogueMenu"
              >
                Unidad responsable
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-Conceptos' }"
                @click="toggleCatalogueMenu"
              >
                Conceptos de obra
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-tipo-escalatoria' }"
                @click="toggleCatalogueMenu"
              >
                Tipo escalatoria
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-factor-escalatoria' }"
                @click="toggleCatalogueMenu"
              >
                Factor escalatoria
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-unidad-medida' }"
                @click="toggleCatalogueMenu"
              >
                Unidad de medida
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-municipios' }"
                @click="toggleCatalogueMenu"
              >
                Municipios
              </router-link>
            </li>

            <!-- Nuevos Catalogos -->
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-tipo-procedimientos' }"
                @click="toggleCatalogueMenu"
              >
                Tipo de procedimientos
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-cat-modalidad-pago' }"
                @click="toggleCatalogueMenu"
              >
                Modalidad de pago
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-caracter-procedimientos' }"
                @click="toggleCatalogueMenu"
              >
                Carácter del procedimiento
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-testigo-social' }"
                @click="toggleCatalogueMenu"
              >
                Testigo social
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-cat_subEstatus' }"
                @click="toggleCatalogueMenu"
              >
                Sub-Estatus
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-cat-proceso' }"
                @click="toggleCatalogueMenu"
              >
                Proceso
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-tipos-contratacion' }"
                @click="toggleCatalogueMenu"
              >
                Tipo de contratación
              </router-link>
            </li>

            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar_periodos_pago' }"
                @click="toggleCatalogueMenu"
              >
                Periodos de pago
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar_modulos' }"
                @click="toggleCatalogueMenu"
              >
                Módulo
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-cat_moneda' }"
                @click="toggleCatalogueMenu"
              >
                Moneda
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-cat_idioma' }"
                @click="toggleCatalogueMenu"
              >
                Idioma
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-cat_proveedores' }"
                @click="toggleCatalogueMenu"
              >
                Proveedores
              </router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{ name: 'listar-cat-estatus' }"
                @click="toggleCatalogueMenu"
              >
                Estatus
              </router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            @click="toggleAccountMenu"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Cuenta
          </a>
          <ul class="dropdown-menu account-dropdown" v-show="showAccountMenu">
            <li>
              <a class="dropdown-item btn" @click="handleLogout">
                Cerrar Sesión
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useAuthStore from "@/store/authenticationStore";

const authStore = useAuthStore();
const showAccountMenu = ref(false);
const showCatalogueMenu = ref(false);
const showScheduleModuleMenu = ref(false);

const toggleAccountMenu = () => {
  showAccountMenu.value = !showAccountMenu.value;
};

const toggleCatalogueMenu = () => {
  showCatalogueMenu.value = !showCatalogueMenu.value;
};

const toggleScheduleModuleMenu = () => {
  showCatalogueMenu.value = !showCatalogueMenu.value;
};

const handleLogout = () => {
  authStore
    .logout()
    .then((response) => {
      if (response) {
        window.location.href = "/saop/";
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>

<style lang="scss" scoped>
nav {
  justify-content: end;
}

.nav-link {
  outline: none;
  margin-left: 5px;
  margin-right: 5px;
}

.exact-active-link {
  color: #ddc9a3 !important;
  font-weight: bold !important;
  outline: none !important;
}

.options-bar {
  text-align: center;

  ul {
    width: 100%;
    justify-content: end;
  }
}

.catalogue-dropdown,
.account-dropdown {
  width: auto !important;
  max-height: 300px; /* Ajusta la altura máxima del menú desplegable */
  overflow-y: auto; /* Habilita la barra de desplazamiento vertical */
}

.menu-width::-webkit-scrollbar {
    display: block;
    width: 8px;
}

.menu-width::-webkit-scrollbar-track {
    background: transparent;
}

.menu-width::-webkit-scrollbar-thumb {
    background-color: #BC955C;
    border-right: none;
    border-left: none;
}

.menu-width::-webkit-scrollbar-track-piece:end {
    background: transparent;
    margin-bottom: 10px;
}

.menu-width::-webkit-scrollbar-track-piece:start {
    background: transparent;
    margin-top: 10px;
}
</style>
