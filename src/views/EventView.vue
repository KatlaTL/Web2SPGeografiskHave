<script setup>
import { onBeforeMount, ref } from 'vue';
import HeaderComponent from "@/components/GlobalComponents/HeaderComponent.vue";
import FooterComponent from "@/components/GlobalComponents/FooterComponent.vue";
import EntrancePrices from '@/components/EventComponents/EntrancePrices.vue';
import EventBanner from '@/components/EventComponents/EventBanner.vue';
import EventForm from '@/components/EventComponents/EventForm.vue';
import TourPrices from '@/components/EventComponents/TourPrices.vue';
import { getEventBanner, getEventContentByID } from '@/services/EventService';
import { useRoute } from 'vue-router';

const route = useRoute();

const eventBanner = ref({})
const content = ref({});
const showEventPrices = ref(true);

onBeforeMount(async () => {
  const eventContent = await getEventContentByID(route.params.eventID);

  if (eventContent.result) {
    content.value = eventContent.result;

    showEventPrices.value = content.value?.category === "event";

    const banner = await getEventBanner(content.value?.category);

    if (banner.result) {
      eventBanner.value = banner.result;
    }
  } else {
    content.value = {
      contentMissing: true
    }
  }
});

</script>

<template>
  <HeaderComponent />

  <div v-if="content.contentMissing" class="error-page-content">
    <h1>Content Missing</h1>
  </div>

  <main v-else>
    <EventBanner :imageURL="eventBanner.imageURL" :imageALT="eventBanner.imageAltText" />

    <div class="event-container">

      <div class="event-headings" v-html="content?.heading"></div>

      <div class="event-top-container">
        <div class="event-text-container event-container-left">
          <div v-html="content?.firstParagraphHeading"></div>
          <div v-html="content?.firstParagraphBody"></div>
          <div v-html="content?.firstParagraphHeading2"></div>
          <div v-html="content?.firstParagraphBody2"></div>
        </div>

        <div class="event-container-right">
          <EntrancePrices v-if="showEventPrices" />
          <TourPrices v-else />
        </div>
      </div>

      <div class="event-bot-container">
        <div class="event-image event-container-left">
          <img :src="content.imageURL" :alt="content.imageAltText" />
        </div>

        <div class="event-text-container event-container-right">
          <div v-html="content?.secondParagraphHeading"></div>
          <div v-html="content?.secondParagraphBody"></div>
          <div v-html="content?.secondParagraphHeading2"></div>
          <div v-html="content?.secondParagraphBody2"></div>
        </div>
      </div>

      <EventForm />
    </div>
  </main>

  <FooterComponent />
</template>
