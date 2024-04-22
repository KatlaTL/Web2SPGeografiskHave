<script setup>
import { useRouter } from "vue-router";
import { ref } from 'vue';

const router = useRouter();
const routes = router.getRoutes().filter(route => route.meta?.location === "navbar");

const searchClass = ref(false);
const searchInput = ref(null);

const toggleSearch = () => searchClass.value = !searchClass.value;

const searchFocus = () => searchInput.value.focus();

const onClickSearch = () => console.log("Searching...") //Search logic goes here;
</script>

<template>
  <header id="header-container">
    <div id="header-logo">
      <RouterLink :to="{ name: 'Home'}">
        <img src="@/assets/images/logo.png" alt="Geografisk Have logo liggende" />
      </RouterLink>
    </div>
    <nav id="header-navbar">
      <ul>
        <li v-for="r in routes" :key="r.path">
          <RouterLink :to="r.path" :class="{ 'dropdown-arrow': r.children.length > 0 }">
            {{ r.meta?.title || r.name }}
          </RouterLink>
        </li>
      </ul>
    </nav>
    <div id="header-search">
      <form>
        <input type="text" :class="{ active: searchClass }" ref="searchInput" @transitionend="searchFocus" />
        <label>
          <span @click="toggleSearch" class="search-icon"></span>
          <span @click="onClickSearch">Søg</span>
        </label>
      </form>
    </div>
  </header>
</template>
