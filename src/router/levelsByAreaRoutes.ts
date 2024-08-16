export const levelsByAreaRoutes = [
    {
        path: '',
        name: 'listar-niveles-area',
        component: () => import('@/views/LevelsByArea/IndexView.vue')
    },
    {
        path: 'crear',
        name: 'crear-nivel-area',
        component: () => import('@/views/LevelsByArea/DetailsView.vue')
    },
    {
        path: ':id/editar',
        name: 'editar-nivel-area',
        component: () => import('@/views/LevelsByArea/DetailsView.vue')
    },
    {
        path: ':id/eliminar',
        name: 'eliminar-nivel-area',
        component: () => import('@/views/LevelsByArea/DeleteView.vue')
    }
]