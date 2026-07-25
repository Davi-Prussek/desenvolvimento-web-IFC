import { createRouter, createWebHistory } from 'vue-router'

import homeApp from '@/views/home-App.vue'
import termoApp from '@/views/termos-App.vue'
import equipeApp from '@/views/equipe-App.vue'
import envioApp from '@/views/envio-App.vue'
import devolucoesApp from '@/views/devolucoes-App.vue'

const routes = [
  {
    path: "/",
    name: "home",
    component: homeApp
  },
  {
    path: "/termos",
    name: "termos",
    component: termoApp,
  },
  {
    path: "/equipe",
    name: "equipe",
    component: equipeApp,
  },
  {
    path: "/envio",
    name: "envio",
    component: envioApp,
  },
  {
    path: "/devolucoes",
    name: "devolucoes",
    component: devolucoesApp,
  },
  {
    path: "/livro/:id",
    name: "Book",
    component: () => import('@/components/bookView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router
