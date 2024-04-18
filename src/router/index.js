import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CalenderView from '../views/CalenderView.vue'
import EventView from '../views/EventView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
     {
      path: '/CalenderView',
      name: 'CalenderView',
      component: CalenderView
    },
    {
      path: '/EventView',
      name: 'EventView',
      component: EventView
    },
  ]
})

export default router
