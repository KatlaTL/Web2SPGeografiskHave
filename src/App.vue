<script setup>
import { RouterView } from 'vue-router'
import { usePricesStore } from "./stores/prices";
import { onBeforeMount, onMounted } from "vue";
import { useUserStore } from './stores/user';

const pricesStore = usePricesStore();
const userStore = useUserStore();

onBeforeMount(async () => {
  await pricesStore.loadEntrancePrices();
  await pricesStore.loadTourPrices();
})

onMounted(() => {
  userStore.setUserOnAuthStateChange();
})
</script>

<template>

  <RouterView />

</template>