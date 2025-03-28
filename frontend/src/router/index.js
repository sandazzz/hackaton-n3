import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import CreateLaboPage from "../views/CreateLaboPage.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePage,
  },
  { path: "/createLab", name: "CreateLab", component: CreateLaboPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
