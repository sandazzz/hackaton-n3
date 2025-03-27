import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue";

const routes = [
    {path: '/', redirect: '/home', component: Home},
    {path: '/home', component: Home, name:'Home'}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router