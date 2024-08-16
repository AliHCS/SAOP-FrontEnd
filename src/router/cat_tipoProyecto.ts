export const cat_tipoProyectoRoutes = [
    {
        path: '',
        name: 'listar-cat_tipoProyecto',
        component: () => import('@/views/Cat_TipoProyecto/Index.vue'),
    },
    {
        path: 'crear',
        name: 'crear-tipoProyecto',
        component: () => import('@/views/Cat_TipoProyecto/Create.vue')
    },
    {
        path: ':id/editar',
        name: 'editar-tipoProyecto',
        component: () => import('@/views/Cat_TipoProyecto/Create.vue')
    },
    {
        path: ':id/eliminar',
        name: 'eliminar-tipoProyecto',
        component: () => import('@/views/Cat_TipoProyecto/Delete.vue')
    }
]