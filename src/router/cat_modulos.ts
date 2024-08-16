export const cat_ModulosRoutes = [
    {
        path: '',
        name: 'listar_modulos',
        component: () => import('@/views/Cat_Modulos/Index.vue'),
    },
    {
        path: 'crear',
        name: 'crear_modulo',
        component: () => import('@/views/Cat_Modulos/Details.vue')
    },
    {
        path: ':id/editar',
        name: 'editar_modulo',
        component: () => import('@/views/Cat_Modulos/Details.vue')
    },
    {
        path: ':id/eliminar',
        name: 'eliminar_modulo',
        component: () => import('@/views/Cat_Modulos/Delete.vue')
    }
]