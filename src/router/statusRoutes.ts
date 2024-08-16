export const statusRoutes = [
    {
        path: '',
        name: 'listar-estatus-proyecto',
        component: () => import('@/views/Status/IndexView.vue')
    },
    {
        path: 'crear',
        name: 'crear-estatus-proyecto',
        component: () => import('@/views/Status/DetailsView.vue')
    },
    {
        path: ':id/editar',
        name: 'editar-estatus-proyecto',
        component: () => import('@/views/Status/DetailsView.vue')
    },
    {
        path: ':id/eliminar',
        name: 'eliminar-estatus-proyecto',
        component: () => import('@/views/Status/DeleteView.vue')
    }
]