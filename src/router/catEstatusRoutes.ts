export const catEstatusRoutes = [
    {
        path: '',
        name: 'listar-cat-estatus',
        component: () => import('@/views/Cat_Estatus/Index.vue'),
    },
    {
        path: 'crear',
        name: 'crear-cat-estatus',
        component: () => import('@/views/Cat_Estatus/Create.vue')
    },
    {
        path: ':id/editar',
        name: 'editar-cat-estatus',
        component: () => import('@/views/Cat_Estatus/Create.vue')
    },
    {
        path: ':id/eliminar',
        name: 'eliminar-cat-estatus',
        component: () => import('@/views/Cat_Estatus/Delete.vue')
    }
]