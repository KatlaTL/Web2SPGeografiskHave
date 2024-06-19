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

      <div class="event-headings flex flex-col xsm:w-[435px] md:w-[910px] my-4" v-html="content?.heading"></div>

      <div class="event-top-container flex xsm:w-[auto] xsm:flex-col md:w-[910px] md:flex-row justify-between items-center">
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

      <div class="event-bot-container flex xsm:w-[auto] xsm:flex-col md:w-[910px] md:flex-row justify-between items-center ">
        <div class="event-image event-container-left">
          <img :src="content.imageURL" :alt="content.imageAltText" class="mb-4" />
        </div>

        <div class="event-text-container event-container-right">
          <div v-html="content?.secondParagraphHeading"></div>
          <div v-html="content?.secondParagraphBody"></div>
          <div v-html="content?.secondParagraphHeading2"></div>
          <div v-html="content?.secondParagraphBody2"></div>
        </div>
      </div>

      <EventForm :formText="content.formText" />
    </div>
  </main>
  
  <FooterComponent />
</template>
