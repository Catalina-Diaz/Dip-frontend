import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MiCatalogo from '../views/MiCatalogo.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home

  },
  {
    path: '/MiCatalogo',
    name: 'MiCatalogo',
    component: MiCatalogo

  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
