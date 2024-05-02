<script setup>
import HeaderComponent from "@/components/HeaderComponent.vue"
import FooterComponent from "@/components/FooterComponent.vue"
import { RouterView } from 'vue-router'
import { usePricesStore } from "./stores/prices";
import { onBeforeMount } from "vue";

const pricesStore = usePricesStore();

onBeforeMount(async () => {
  await pricesStore.loadEntrancePrices();
  await pricesStore.loadTourPrices();
})
</script>

<template>
  <HeaderComponent />

  <RouterView />

  <FooterComponent />
</template>