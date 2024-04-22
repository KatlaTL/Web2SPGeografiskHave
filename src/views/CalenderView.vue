<script setup>
import footerComponent from "@/components/FooterComponent.vue"
</script>

<template>
  <main>
    <h1>CalenderView</h1>
    <router-link :to="{name: 'EventView'}">
      <button id="myButton">EventView</button>
    </router-link>
    <footerComponent/>
  </main>
</template>