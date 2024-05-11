<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const routes = router.getRoutes().filter(route => route.meta?.location === "navbar");
const isDisabled = ref(false);

const props = defineProps({
    adminPage: false
})

const routerLinkPath = (path) => {
    if (props.adminPage) {
        isDisabled.value = true;
        return {};
    }
    isDisabled.value = false;
    return path;
}

const emit = defineEmits(['getRouteData']);

const adminLinkClick = (routeName) => {
  if (props.adminPage) {
    emit('getRouteData', routeName)
  }
  return;
}

</script>


<template>
    <nav id="header-navbar">
      <ul>
        <li v-for="r in routes" :key="r.path">
          <RouterLink :to="routerLinkPath(r.path)" :class="{ 'dropdown-arrow': r.children.length > 0, disabled: isDisabled }" @click="() => adminLinkClick(r.name)">
            {{ r.meta?.title || r.name }}
          </RouterLink>
        </li>
      </ul>
    </nav>
</template>