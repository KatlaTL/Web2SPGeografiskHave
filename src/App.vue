<script setup>
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

  <RouterView />

</template>