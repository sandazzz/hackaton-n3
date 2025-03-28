import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue";
import ProfilePage from "../views/ProfilePage.vue";

const routes = [
    {path: '/', redirect: '/home', component: Home},
    {path: '/home', component: Home, name:'Home'},
    {path: '/profile', component: ProfilePage, name:'Profile'}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
