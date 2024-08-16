export const feasibilityRoutes = [
    {
        path: '',
        name: 'listar-factibilidad-obra',
        component: () => import('@/views/Feasibility/IndexView.vue')
    },
    {
        path: 'crear',
        name: 'crear-factibilidad-obra',
        component: () => import('@/views/Feasibility/DetailsView.vue')
    },
    {
        path: ':id/editar',
        name: 'editar-factibilidad-obra',
        component: () => import('@/views/Feasibility/DetailsView.vue')
    },
    {
        path: ':id/eliminar',
        name: 'eliminar-factibilidad-obra',
        component: () => import('@/views/Feasibility/DeleteView.vue')
    }
]