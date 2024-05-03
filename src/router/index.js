import { createRouter, createWebHistory } from 'vue-router';
import { ref } from 'vue';
import HomeView from '../views/HomeView.vue';
import { onAuthStateChanged } from '@firebase/auth';
import { getTopNavigationMenu } from '@/services/NavigationService';
import { auth } from '@/config/firebase';

const isAuthenticated = ref(false);
const fromRoute = ref(null);

onAuthStateChanged(auth, (user) => {
  if (user) {
    isAuthenticated.value = true;
    //router.push({ name: fromRoute.value?.name || "Admin panel" });
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

// Populate routes with data from the database
const navBar = await getTopNavigationMenu();

if (navBar.result) {
  navBar.result.forEach(routeData => {
    let componentPath = routeData?.routerComponentRelativePath || "/views/ErrorView.vue";
    componentPath = ".." + componentPath;

    router.addRoute({
      path: routeData.routerPath,
      name: routeData.routerName,
      meta: routeData.routerMeta,
      component: () => import(/* @vite-ignore */ componentPath), // Added the vite ignore to remove warning that Vite can't analyse the dynamic import
      ...(routeData.subNavigation.length > 0 && {
        children: routeData.subNavigation.map(subNav => {
          return {
            path: subNav?.routerPath || "/deadlink",
            name: subNav?.routerName || "dummy link",
          }
        })
      })
    })
  })
}

// Disable links with path /deadlink
router.beforeEach((to, from) => {
  if (to.path === "/deadlink") {
    return { name: from.name }
  }

  if (to.meta?.requireAuth === true && !isAuthenticated.value) {
    fromRoute.value = from;
    return { name: "Admin login" }
  }

  if (isAuthenticated.value && to.name === "Admin login") {
    return { name: "Admin panel"}
  }
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
})

export default router
