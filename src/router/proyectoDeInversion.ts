export const proyectoDeInversiones = [
    {
        path: '',
        name: 'listar-proyecto_de_inversion',
        component: () => import('@/views/ProyectoDeInversion/Index.vue'),
    }, 
    {
        path: 'crear',
        name: 'crear-proyecto_de_inversion',
        component: () => import('@/views/ProyectoDeInversion/Create.vue')
    },
    {
        path: ':id/ver',
        name: 'ver-proyecto_de_inversion',
        component: () => import('@/views/ProyectoDeInversion/Create.vue')
    },
    {
        path: ':id/editar',
        name: 'editar-proyecto_de_inversion',
        component: () => import('@/views/ProyectoDeInversion/Create.vue')
    },
    {
        path: ':id/eliminar',
        name: 'eliminar-proyecto_de_inversion',
        component: () => import('@/views/ProyectoDeInversion/Delete.vue')
    },
    {
        path: 'calendario-anual',
        name: 'calendario-anual-proyecto_de_inversion',
        component: () => import('@/views/ProyectoDeInversion/AnnualCalendar/IndexAnnualCalendar.vue')
    },
    {
        path: 'calendario-anual/crear',
        name: 'crear-calendario-anual-proyecto_de_inversion',
        component: () => import('@/views/ProyectoDeInversion/AnnualCalendar/Create.vue')
    },
    {
        path: 'calendario-anual/:id/editar',
        name: 'editar-calendario-anual-proyecto_de_inversion',
        component: () => import('@/views/ProyectoDeInversion/AnnualCalendar/Create.vue')
    },
    {
        path: 'historico-anual',
        name: 'historico-anual-proyecto_de_inversion',
        component: () => import('@/views/ProyectoDeInversion/Historico/IndexHistorico.vue')
    },
    {
        path: 'administrador-contenido',
        name: 'administrador-contenido-proyecto_de_inversion',
        component: () => import('@/views/ProyectoDeInversion/AdministradorContenido/IndexAdministradorContenido.vue')
    },
]