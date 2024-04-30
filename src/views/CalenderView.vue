<script setup>
import footerComponent from "@/components/FooterComponent.vue"
import controls from "@/components/EventComponents/EventControls.vue"
import CalendarContainer from "@/components/EventComponents/CalendarContainer.vue"

</script>

<template>
  <main>
    <controls />
    <CalendarContainer />
  </main>
  <footerComponent/>
</template>