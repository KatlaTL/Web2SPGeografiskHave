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
        xsm:w-[150px] sm:w-[200px] mdsm:w-[200px] mdsm:h-[50px] md:w-[230px] md:h-[55px] lg:w-[240px] lg:h-[59px] xl:w-[307px] xl:h-[75px]
         "/>
      </RouterLink>
    </div>

    <NavBarComponent />

    <div id="header-search" class="sm:w-[75px] mdsm:w-[100px] md:w-[150px] lg:w-[200px]">
      <form>
        <input type="text" :class="{ active: searchClass }" ref="searchInput" @transitionend="searchFocus"/>
        <label @click="toggleSearch">
          <span  class="search-icon"></span>
          <span @click="onClickSearch" class="xsm:text-xsm sm:text-sm mdsm:text-base md:text-lg lg:text-lg xl:text-xl">Søg</span>
        </label>
      </form>
    </div>
  </header>
</template>
