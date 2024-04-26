import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getTopNavigationMenu } from '@/services/NavigationService';


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
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
})

export default router
