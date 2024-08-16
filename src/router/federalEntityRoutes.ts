export const federalEntityRoutes = [
    {
        path: '',
        name: 'listar-entidad-federativa',
        component: () => import('@/views/FederalEntities/IndexView.vue')
    },
    {
        path: 'crear',
        name: 'crear-entidad-federativa',
        component: () => import('@/views/FederalEntities/DetailsView.vue')
    },
    {
        path: ':id/editar',
        name: 'editar-entidad-federativa',
        component: () => import('@/views/FederalEntities/DetailsView.vue')
    },
    {
        path: ':id/eliminar',
        name: 'eliminar-entidad-federativa',
        component: () => import('@/views/FederalEntities/DeleteView.vue')
    }
]