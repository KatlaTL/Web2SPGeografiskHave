import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CalenderView from '../views/CalenderView.vue'
import EventView from '../views/EventView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        title: "Home"
      }
    },
    {
      path: '/',
      name: 'About the garden',
      meta: {
        title: "Om haven",
        location: "navbar",
        deadLink: true
      },
      children: [{
        path: "/",
        name: "dummy link",
        deadLink: true
      }]
    },
    {
      path: '/',
      name: 'Private Events',
      meta: {
        title: "Privat Events",
        location: "navbar",
        deadLink: true
      }
    },
    {
      path: '/calender',
      name: 'CalenderView',
      component: CalenderView,
      meta: {
        title: "Kalender",
        location: "navbar"
      }
    },
    {
      path: '/',
      name: 'Knowledge center',
      meta: {
        title: "Videnscenter",
        location: "navbar",
        deadLink: true
      }
    },
    {
      path: '/EventView',
      name: 'EventView',
      component: EventView
    },
  ]
})

export default router
