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
        <img src="@/assets/images/logo.png" alt="Geografisk Have logo liggende" class="
        mdsm:w-[200] mdsm:h-[50px] md:w-[250px] md:h-[60px] lg:w-[307px] lg:h-[75px]
        mdsm:text-base md:text-lg lg:text-xl
         "/>
      </RouterLink>
    </div>

    <NavBarComponent />

    <div id="header-search" class="mdsm:w-[100] md:w-[150px] lg:w-[200px]">
      <form>
        <input type="text" :class="{ active: searchClass }" ref="searchInput" @transitionend="searchFocus"/>
        <label @click="toggleSearch">
          <span  class="search-icon"></span>
          <span @click="onClickSearch" class=" mdsm:text-base md:text-lg lg:text-xl">Søg</span>
        </label>
      </form>
    </div>
  </header>
</template>
