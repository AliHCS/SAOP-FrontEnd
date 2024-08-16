export const cat_PeriodosPagoRoutes = [
    {
        path: '',
        name: 'listar_periodos_pago',
        component: () => import('@/views/Cat_Periodos_Pago/Index.vue'),
    },
    {
        path: 'crear',
        name: 'crear_periodo_pago',
        component: () => import('@/views/Cat_Periodos_Pago/Details.vue')
    },
    {
        path: ':id/editar',
        name: 'editar_periodo_pago',
        component: () => import('@/views/Cat_Periodos_Pago/Details.vue')
    },
    {
        path: ':id/eliminar',
        name: 'eliminar_periodo_pago',
        component: () => import('@/views/Cat_Periodos_Pago/Delete.vue')
    }
]