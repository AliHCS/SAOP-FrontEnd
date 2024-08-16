export const constructionTypesRoutes = [
    {
        path: '',
        name: 'listar-tipo-obra',
        component: () => import('@/views/ConstructionTypes/IndexView.vue')
    },
    {
        path: 'crear',
        name: 'crear-tipo-obra',
        component: () => import('@/views/ConstructionTypes/DetailsView.vue')
    },
    {
        path: ':id/editar',
        name: 'editar-tipo-obra',
        component: () => import('@/views/ConstructionTypes/DetailsView.vue')
    },
    {
        path: ':id/eliminar',
        name: 'eliminar-tipo-obra',
        component: () => import('@/views/ConstructionTypes/DeleteView.vue')
    }
]