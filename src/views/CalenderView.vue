<script setup>
import HeaderComponent from "@/components/GlobalComponents/HeaderComponent.vue";
import FooterComponent from "@/components/GlobalComponents/FooterComponent.vue";
import BreadcrumbsComponent from "@/components/GlobalComponents/BreadcrumbsComponent.vue";
import CalendarContainer from "@/components/EventComponents/CalendarContainer.vue";
import CalendarHeaderText from "@/components/EventComponents/CalendarHeaderText.vue";
import EventBanner from "@/components/EventComponents/EventBanner.vue";
import { getCalenderBanner } from "@/services/EventService";
import { onBeforeMount, ref } from "vue";

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

  <BreadcrumbsComponent />

  <EventBanner :imageURL="eventBanner.imageURL" :imageALT="eventBanner.imageAltText" />

  <CalendarHeaderText />

  <CalendarContainer />

  <FooterComponent />
</template>
