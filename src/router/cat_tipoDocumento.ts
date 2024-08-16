export const cat_tipoDocumentoRoutes = [
    {
        path: '',
        name: 'listar-cat_tipoDocumento',
        component: () => import('@/views/Cat_TipoDocumento/Index.vue'),
    },
    {
        path: 'crear',
        name: 'crear-tipoDocumento',
        component: () => import('@/views/Cat_TipoDocumento/Create.vue')
    },
    {
        path: ':id/editar',
        name: 'editar-tipoDocumento',
        component: () => import('@/views/Cat_TipoDocumento/Create.vue')
    },
    {
        path: ':id/eliminar',
        name: 'eliminar-tipoDocumento',
        component: () => import('@/views/Cat_TipoDocumento/Delete.vue')
    }
]