export const cat_Unidad_Responsable = [
    {
        path: '',
        name: 'listar-cat_unidad_responsable',
        component: () => import('@/views/Cat_Unidad_Responsable/Index.vue'),
    },
    {
        path: 'crear',
        name: 'crear-cat_unidad_responsable',
        component: () => import('@/views/Cat_Unidad_Responsable/Create.vue')
    },
    {
        path: ':id/editar',
        name: 'editar-cat_unidad_responsable',
        component: () => import('@/views/Cat_Unidad_Responsable/Create.vue')
    },
    {
        path: ':id/eliminar',
        name: 'eliminar-cat_unidad_responsable',
        component: () => import('@/views/Cat_Unidad_Responsable/Delete.vue')
    }
]