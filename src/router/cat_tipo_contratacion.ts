export const cat_TipoContratacionRoutes = [
    {
        path: '',
        name: 'listar-tipos-contratacion',
        component: () => import('@/views/Cat_Tipo_Contratacion/Index.vue'),
    },
    {
        path: 'crear',
        name: 'crear-cat_tipo_contratacion',
        component: () => import('@/views/Cat_Tipo_Contratacion/Details.vue')
    },
    {
        path: ':id/editar',
        name: 'editar-cat_tipo_contratacion',
        component: () => import('@/views/Cat_Tipo_Contratacion/Details.vue')
    },
    {
        path: ':id/eliminar',
        name: 'eliminar-cat_tipo_contratacion',
        component: () => import('@/views/Cat_Tipo_Contratacion/Delete.vue')
    }
]