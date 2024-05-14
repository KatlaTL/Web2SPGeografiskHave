<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import NavBarComponent from "./NavBarComponent.vue";
import { populateRoutes } from '@/services/NavigationService';
import { useRouter } from 'vue-router';

const router = useRouter();

const searchClass = ref(false);
const searchInput = ref(null);
const navComponentKey = ref(0);

onBeforeMount(async () => {
  // Populate routes with data from the database
  await populateRoutes(router);

  //Force rerender of navbar component when routes are populated
  navComponentKey.value++;
});

const toggleSearch = () => searchClass.value = !searchClass.value;

const searchFocus = () => searchInput.value.focus();

const onClickSearch = () => console.log("Searching...") //Search logic goes here;
</script>

<template>
  <header id="header-container">
    <div id="header-logo">
      <RouterLink :to="{ name: 'Home' }">
        <img src="@/assets/images/logo.png" alt="Geografisk Have logo liggende" />
      </RouterLink>
    </div>

    <NavBarComponent :key="navComponentKey" />

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
