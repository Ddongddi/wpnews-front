import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// Vue/
// const { cookies } = useCookies();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/category',
      name: 'category',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue')
    },
    {
      path: '/admin/write',
      name: 'article write',
      component: () => import('../views/ArticleWriteView.vue')
    },
    {
      path: '/admin/manage',
      name: 'article manage',
      component: () => import('../views/ArticleListView.vue')
    },
    {
      path: '/admin/edit/:id',
      name: 'article editor',
      component: () => import('../views/ArticleEditView.vue')
    },
    {
      path: '/category/:name',
      name: 'show category info',
      component: () => import('../views/CategoryInfoView.vue')
    },
    {
      path: '/admin/position',
      name: 'article position set',
      component: () => import('../views/PosSetView.vue')
    },
    {
      path: '/article/:id',
      name: 'article infos',
      component: () => import('../views/ArticleInfoView.vue')
    },
    {
      path: '/admin/profile',
      name: 'profile setup',
      component: () => import('../views/AdminProfileView.vue')
    }
  ]
})

export default router
