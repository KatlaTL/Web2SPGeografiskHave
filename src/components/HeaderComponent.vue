<script setup>
import { useRouter } from "vue-router";
import { ref } from 'vue';

const router = useRouter();
const routes = router.getRoutes().filter(route => route.meta?.location === "navbar");

const search = ref(false);

const onClickSearch = () => search.value = !search.value;

</script>

<template>
  <header id="header-container">
    <div id="header-logo">
      <img src="@/assets/images/logo.png" alt="Geografisk Have logo liggende" />
    </div>
    <nav id="header-navbar">
      <ul>
        <li v-for="r in routes" :key="r.path">
          <RouterLink :to="r.path" :class="{ 'dropdown-arrow': r.children.length > 0 }">{{ r.meta?.title || r.name }}
          </RouterLink>
        </li>
      </ul>
    </nav>
    <div id="header-search">
      <form>
        <input type="text" :class="{ active: search }" />
        <div v-on:click="onClickSearch">
          <label>Søg</label>
        </div>
      </form>
    </div>
  </header>
</template>
