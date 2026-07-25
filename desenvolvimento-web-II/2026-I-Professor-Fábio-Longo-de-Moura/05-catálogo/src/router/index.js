import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AlimentosView from "@/views/AlimentosView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
    name: "Home",
  },
  {
    path: "/alimentos",
    component: AlimentosView,
    name: "Alimentos"
  },
  {
    path: "/brinquedos",
    component: () => import('@/views/brinquedosView.vue'),
    name: "Brinquedos"
  },
  {
    path: "/higiene",
    component: () => import('@/views/HigieneView.vue'),
    name: "Higiene"
  },
  {
    path: "/acessorios",
    component: () => import('@/views/AcessóriosView.vue'),
    name: "Acessórios"
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
