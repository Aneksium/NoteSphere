import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '../routes/HomePage/HomePage.vue'
import EditorPage from '@/routes/EditorPage/EditorPage.vue'

const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/edit/:board/:id', name: 'Editor', component: EditorPage }
]

const router = createRouter({
    history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
    routes
})

export default router