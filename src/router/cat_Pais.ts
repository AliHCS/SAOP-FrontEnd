export const cat_PaisRoutes = [
    {
        path: '',
        name: 'listar-cat_Pais',
        component: () => import('@/views/Cat_Pais/Index.vue'),
    },
    {
        path: 'crear',
        name: 'crear-cat_Pais',
        component: () => import('@/views/Cat_Pais/Create.vue')
    },
    {
        path: ':id/editar',
        name: 'editar-cat_Pais',
        component: () => import('@/views/Cat_Pais/Create.vue')
    },
    {
        path: ':id/eliminar',
        name: 'eliminar-cat_Pais',
        component: () => import('@/views/Cat_Pais/Delete.vue')
    }
]