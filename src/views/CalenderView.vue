<script setup>
import HeaderComponent from "@/components/GlobalComponents/HeaderComponent.vue";
import FooterComponent from "@/components/GlobalComponents/FooterComponent.vue";
import CalendarContainer from "@/components/EventComponents/CalendarContainer.vue";
import CalendarHeaderText from "@/components/EventComponents/CalendarHeaderText.vue";
import EventBanner from "@/components/EventComponents/EventBanner.vue";
import { getCalenderBanner } from "@/services/EventService";
import { onBeforeMount, ref } from "vue";
import { setDescription } from "@m-media/vue3-meta-tags";

setDescription("Vores kalender følger højtiderne og sæsonerne, så du kan føle dig velkommen året rundt. Kalenderen opdateres løbende med nye, spændende arrangementer.");

const eventBanner = ref({})

onBeforeMount(async () => {
  const banner = await getCalenderBanner();

  if (banner.result) {
    eventBanner.value = banner.result;
  }

});
</script>

<template>
  <HeaderComponent />

  <EventBanner :imageURL="eventBanner.imageURL" :imageALT="eventBanner.imageAltText" />

  <CalendarHeaderText />

  <CalendarContainer />

  <FooterComponent />
</template>
