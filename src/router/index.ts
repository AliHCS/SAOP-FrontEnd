import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'

export const router = createRouter({
    history: createWebHistory(), 
    routes,
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
})

export default router