import { createRouter, createWebHistory } from 'vue-router';
import { ref } from 'vue';
import HomeView from '../views/HomeView.vue';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '@/config/firebase';

const isAuthenticated = ref(false);

onAuthStateChanged(auth, (user) => {
  if (user) {
    isAuthenticated.value = true;
  } else {
    isAuthenticated.value = false;
  }
})

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
      path: '/Event/:eventID',
      name: 'Event',
      component: () => import('../views/EventView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Error page',
      component: () => import('../views/ErrorView.vue')
    },
    {
      path: '/admin-login',
      name: 'Admin login',
      component: () => import('../views/AdminLoginView.vue')
    },
    {
      path: '/admin',
      name: 'Admin panel',
      meta: {
        title: "Admin",
        requireAuth: true
      },
      component: () => import('../views/AdminView.vue')
    }
  ]
})

// Disable links with path /deadlink
router.beforeEach((to, from) => {
  if (to.path === "/deadlink") {
    return { name: from.name }
  }
})

router.beforeEach((to, from) => {
  if (to.meta?.requireAuth === true && !isAuthenticated.value) {
    return { name: "Admin login" }
  }

  if (isAuthenticated.value && to.name === "Admin login") {
    return { name: "Admin panel" }
  }
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
})

export default router
