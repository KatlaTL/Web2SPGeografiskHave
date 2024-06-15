<script setup>
import { ref } from 'vue';
import NavBarComponent from "./NavBarComponent.vue";

const searchClass = ref(false);
const searchInput = ref(null);

const toggleSearch = () => searchClass.value = !searchClass.value;

const searchFocus = () => searchInput.value.focus();

const onClickSearch = () => console.log("Searching...") //Search logic goes here;
</script>

<template>
  <header class="flex sticky top-0 bg-headerColor py-4">
    <div class="flex flex-auto content-center ml-4">
      <RouterLink :to="{ name: 'Home' }">
        <img src="@/assets/images/logo.png" alt="Geografisk Have logo liggende" class="w-[307px] h-[75px]"/>
      </RouterLink>
    </div>

    <NavBarComponent />

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
