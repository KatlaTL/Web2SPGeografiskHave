<script setup>
import HeaderComponent from "@/components/GlobalComponents/HeaderComponent.vue";
import FooterComponent from "@/components/GlobalComponents/FooterComponent.vue";
import CalendarContainer from "@/components/EventComponents/CalendarContainer.vue";
import CalendarHeaderText from "@/components/EventComponents/CalendarHeaderText.vue";
</script>

<template>
  <HeaderComponent />
  
  <CalendarHeaderText />

  <CalendarContainer />

  <FooterComponent />
</template>
