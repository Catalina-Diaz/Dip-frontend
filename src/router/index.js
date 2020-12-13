import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MiCatalogo from '../views/MiCatalogo.vue'
import Catalogo from '../views/Catalogo.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home

  },
  {
    path: '/MiCatalogo/:username',
    name: 'MiCatalogo',
    component: MiCatalogo

  },
  {
    path: '/Catalogo/:username2',
    name: 'Catalogo',
    component: Catalogo

  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
