<script setup>
import footerComponent from "@/components/FooterComponent.vue";
import CalendarContainer from "@/components/EventComponents/CalendarContainer.vue";
</script>

<template>
  <HeaderComponent />

  <EventBanner
    :imageURL="calenderBanner.imageURL"
    :imageAltText="calenderBanner.imageAltText"
  />

  <main>
    <template>
      <main>
        <CalendarContainer />
      </main>
      <footerComponent />
    </template>
  </main>

  <FooterComponent />
</template>
