<script setup>
import headerComponent from "@/components/HeaderComponent.vue"
</script>

<template>
  <headerComponent/>
  <main>
    <h1>CalenderView</h1>
    <router-link :to="{name: 'EventView'}">
  <button id="myButton">EventView</button>
</router-link>
  </main>
</template>