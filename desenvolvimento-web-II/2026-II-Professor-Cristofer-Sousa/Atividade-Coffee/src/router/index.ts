import { createRouter, createWebHistory } from 'vue-router'

const caminhoIcon: string = '../../public/icons/'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeVue.vue'),
      meta: {
        icon: 'fi fi-rs-home'
      }
    },
    {
      path: '/avaliacao',
      name: 'Avaliações',
      component: () => import('../views/AvaliacoesVue.vue'),
      meta: {
        icon: 'fi fi-rr-clipboard-list'
      }
    },
    {
      path: '/AddCoffee',
      name: 'Adicionar Café',
      component: () => import('../views/AddCoffee/AddCoffeeVue.vue'),
      meta: {
        icon: 'fi fi-rr-coffee'
      }
    },
    {
      path: '/ranking',
      name: 'Ranking',
      component: () => import('../views/RankingVue.vue'),
      meta: {
        icon: 'fi fi-rr-trophy'
      }
    },
    {
      path: '/desc/:id',
      name: 'DetailsPage',
      component: () => import('../views/CoffeeDesc.vue'),
    },
    {
      path: '/error',
      name: 'Error',
      component: () => import('../views/ErrorVue.vue'),
    },
  ],
})

export default router
