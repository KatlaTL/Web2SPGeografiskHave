<script setup>
import headerComponent from "@/components/HeaderComponent.vue"
import footerComponent from "@/components/FooterComponent.vue"
</script>

<template>
  <headerComponent/>
  <main>
      <headerComponent/>
    <h1>CalenderView</h1>
    <router-link :to="{name: 'EventView'}">
      <button id="myButton">EventView</button>
    </router-link>
    <footerComponent/>
  </main>
</template>