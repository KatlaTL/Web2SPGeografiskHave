import { createRouter, createWebHistory } from 'vue-router';
import { ref } from 'vue';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '@/config/firebase';
import HomeView from '../views/HomeView.vue';
import { populateRoutes } from '@/services/NavigationService';
import { useBreadcrumbsStore } from '@/stores/breadcrumbs';

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
        title: "Home",
        breadcrumb: {
          breadcrumbLevel: 1
        }
      }
    },
    {
      path: '/Event/:eventID',
      name: 'Event',
      meta: {
        breadcrumb: {
          breadcrumbLevel: 3,
          parrent: "Calender"
        }
      },
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
await populateRoutes(router);

// Disable links with path /deadlink
router.beforeEach((to, from) => {
  if (to.path === "/deadlink") {
    return { name: from.name }
  }
})

router.beforeEach((to) => {
  if (to.meta?.requireAuth === true && !isAuthenticated.value) {
    return { name: "Admin login" }
  }

  if (isAuthenticated.value && to.name === "Admin login") {
    return { name: "Admin panel" }
  }
})

router.beforeResolve((to, from) => {
  const breadcrumbStore = useBreadcrumbsStore();

  const breadcrumbs = breadcrumbStore.breadcrumbs;

  breadcrumbs.forEach((breadcrumb, index) => {
    if (breadcrumb.breadcrumbLevel === to.meta?.breadcrumb?.breadcrumbLevel) {
      breadcrumbStore.removeBreadcrumbs(index);
    }

    if (!from.name && to.meta?.breadcrumb?.parrent) {
      const parrentRoute = router.getRoutes().find(route => route.name === to.meta?.breadcrumb?.parrent);

      breadcrumbStore.addBreadcrumb({
        breadcrumbLevel: parrentRoute.meta?.breadcrumb?.breadcrumbLevel,
        routePath: parrentRoute.path,
        routeName: parrentRoute.meta?.title || parrentRoute.name
      });
    }
  });

  breadcrumbStore.addBreadcrumb({
    breadcrumbLevel: to.meta?.breadcrumb?.breadcrumbLevel,
    routePath: to.path,
    routeName: to.meta?.title || to.name
  });
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
})

router.onError((error, to) => {
  if (error.message.includes('Failed to fetch dynamically imported module') || error.message.includes("Importing a module script failed")) {
    window.location = to.fullPath
  }
})

export default router
