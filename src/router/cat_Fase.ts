export const cat_FaseRoutes = [
    {
        path: '',
        name: 'listar-cat_Fase',
        component: () => import('@/views/Cat_Fase/Index.vue'),
    },
    {
        path: 'crear',
        name: 'crear-cat_Fase',
        component: () => import('@/views/Cat_Fase/Create.vue')
    },
    {
        path: ':id/editar',
        name: 'editar-cat_Fase',
        component: () => import('@/views/Cat_Fase/Create.vue')
    },
    {
        path: ':id/eliminar',
        name: 'eliminar-cat_Fase',
        component: () => import('@/views/Cat_Fase/Delete.vue')
    }
]