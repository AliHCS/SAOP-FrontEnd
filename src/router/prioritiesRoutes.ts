export const prioritiesRoutes = [
    {
        path: '',
        name: 'listar-prioridades',
        component: () => import('@/views/Priorities/IndexView.vue')
    },
    {
        path: 'crear',
        name: 'crear-prioridad',
        component: () => import('@/views/Priorities/DetailsView.vue')
    },
    {
        path: ':id/editar',
        name: 'editar-prioridad',
        component: () => import('@/views/Priorities/DetailsView.vue')
    },
    {
        path: ':id/eliminar',
        name: 'eliminar-prioridad',
        component: () => import('@/views/Priorities/DeleteView.vue')
    }
]