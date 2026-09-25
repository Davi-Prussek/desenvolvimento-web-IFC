import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'pets',
    },
    {
      path: '/pets',
      name: 'pets',
      component: () => import('../views/PetsView.vue'),
    },
  ],
});

export default router;
