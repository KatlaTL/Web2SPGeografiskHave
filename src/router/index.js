import { createRouter, createWebHistory } from "vue-router";
import { ref } from "vue";
import HomeView from "../views/HomeView.vue";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/config/firebase";
import { populateRoutes } from "@/services/NavigationService";

const isAuthenticated = ref(false);

onAuthStateChanged(auth, (user) => {
  if (user) {
    isAuthenticated.value = true;
  } else {
    isAuthenticated.value = false;
  }
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      meta: {
        title: "Home",
        description:
          "Geografisk Have i Kolding er en 14 hektar stor botanisk have, hvor træer, buske og urter er plantet sammen efter geografisk oprindelse, fx Asien, Sydamerika og Nordamerika.",
        locale: "da_DK",
        site_name:"hej",
      }
    },
    {
      path: "/Event/:eventID",
      name: "Event",
      meta: {
        title:"Event",
        locale:"da-DK"
      },
      component: () => import("../views/EventView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "Error page",
      component: () => import("../views/ErrorView.vue"),
    },
    {
      path: "/admin-login",
      name: "Admin login",
      component: () => import("../views/AdminLoginView.vue"),
    },
    {
      path: "/admin",
      name: "Admin panel",
      meta: {
        title: "Admin",
        requireAuth: true,
      },
      component: () => import("../views/AdminView.vue"),
    },
  ],
});

// Populate routes with data from the database
await populateRoutes(router);

// Disable links with path /deadlink
router.beforeEach((to, from) => {
  if (to.path === "/deadlink") {
    return { name: from.name };
  }
});

router.beforeEach((to, from) => {
  if (to.meta?.requireAuth === true && !isAuthenticated.value) {
    return { name: "Admin login" };
  }

  if (isAuthenticated.value && to.name === "Admin login") {
    return { name: "Admin panel" };
  }
});

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});

router.onError((error, to) => {
  if (
    error.message.includes("Failed to fetch dynamically imported module") ||
    error.message.includes("Importing a module script failed")
  ) {
    window.location = to.fullPath;
  }
});

export default router;
