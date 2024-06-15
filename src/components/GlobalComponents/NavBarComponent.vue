<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const routes = router
  .getRoutes()
  .filter((route) => route.meta?.location === "navbar");
const isDisabled = ref(false);

const props = defineProps({
  adminPage: false,
});

const routerLinkPath = (path) => {
  if (props.adminPage) {
    isDisabled.value = true;
    return {};
  }
  isDisabled.value = false;
  return path;
};

const emit = defineEmits(["getRouteData"]);

const adminLinkClick = (routeName) => {
  if (props.adminPage) {
    emit("getRouteData", routeName);
  }
  return;
};

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <nav id="header-navbar" >
    <ul >
      <li v-for="r in routes" :key="r.path" class="xsm:hidden lg:block">
        <RouterLink
          :to="routerLinkPath(r.path)"
          :class="{
            'dropdown-arrow': r.children.length > 0,
            disabled: isDisabled,
          }"
          @click="() => adminLinkClick(r.name)"
          class="mdsm:text-base md:text-lg lg:text-xl"
        >
          {{ r.meta?.title || r.name }}
        </RouterLink>
      </li>
    </ul>
    <div class="flex flex-wrap w-32 gap-4 fixed z-[10] xsm:block lg:hidden">
      <button
        @click="toggleMenu"
        value="hamburger"
        class="flex flex-col justify-around h-8 w-8 p-1 rounded hover:bg-gray-400"
      >
        <!-- Hamburger Icon (3 lines) -->
        <span class="h-0.5 rounded bg-whiteColor w-full"></span>
        <span class="h-0.5 rounded bg-whiteColor w-full"></span>
        <span class="h-0.5 rounded bg-whiteColor w-full"></span>
      </button>
      <template v-if="isMenuOpen" class="text-2xl">
        <!-- Menu Items -->
        <li v-for="r in routes" :key="r.path">
          <RouterLink
            :to="routerLinkPath(r.path)"
            :class="{
              'dropdown-arrow': r.children.length > 0,
              disabled: isDisabled,
            }"
            @click="() => adminLinkClick(r.name)"
            class="mdsm:text-base md:text-lg lg:text-xl"
          >
            {{ r.meta?.title || r.name }}
          </RouterLink>
        </li>
      </template>
    </div>
  </nav>
</template>
