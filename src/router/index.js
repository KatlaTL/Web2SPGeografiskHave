import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      path: '/deadlink',
      name: 'About the garden',
      meta: {
        title: "Om haven",
        location: "navbar",
        deadLink: true
      },
      children: [{
        path: "/deadlink",
        name: "dummy link",
        deadLink: true
      }]
    },
    {
      path: '/deadlink',
      name: 'Private Events',
      meta: {
        title: "Privat Events",
        location: "navbar",
        deadLink: true
      }
    },
    {
      path: '/calender',
      name: 'Calender',
      component: () => import('../views/CalenderView.vue'),
      meta: {
        title: "Kalender",
        location: "navbar"
      }
    },
    {
      path: '/deadlink',
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
      component: () => import('../views/EventView.vue')
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import('../views/ErrorView.vue')
    }
  ]
})

// Disable links with path /deadlink
router.beforeEach((to, from) => {
  if (to.path === "/deadlink") {
    return { name: from.name }
  }
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
})

export default router
