<script setup>
import { onBeforeMount, ref } from 'vue';
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import EntrancePrices from '@/components/EventComponets/EntrancePrices.vue';
import EventBanner from '@/components/EventComponets/EventBanner.vue';
import EventForm from '@/components/EventComponets/EventForm.vue';
import TourPrices from '@/components/EventComponets/TourPrices.vue';
import { getEventBanner } from '@/services/EventService';

const eventBanner = ref({})


onBeforeMount(async () => {
  const banner = await getEventBanner("tours"); // TO-DO make argument dynamic

  if (banner.result) {
    eventBanner.value = banner.result;
  }
})


</script>

<template>
   <HeaderComponent />

  <EventBanner :imageURL="eventBanner.imageURL" :imageALT="eventBanner.imageAltText" />
  <main>
    <div class="event-container">

      <div class="event-headings">
        <h1>Plantemarked i Geografisk Have 2024</h1>
        <p>Årets Plantemarked afholdes i Geografisk Have lørdag d. 25. maj kl. 10-17 og søndag d. 26. maj kl. 10-17.</p>
      </div>

      <div class="event-top-container">
        <div class="event-text-container event-container-left">
          <h2>Hvad er Plantemarkede</h2>
          <p>Gå på jagt efter unikke stauder, roser, liljer, løg, buske, træer, brugskunst, delikatesser og andre fine
            skatte til haven. Kom og gør unikke fund til gode priser og få en snak med professionelle og entusiastiske
            plantefolk fra Danmark og udlandet. Husk at medbringe en kurv eller kasse til dine plantekøb, så vi sparer
            på
            plastikposerne.</p>
          <p>Plantemarkedet er et botanisk slaraffenland for alle haveelskere og et besøg værd alene for den gode
            stemning! &mdash; <i>Vi glæder os så meget til at se jer til to skønne dage fulde af planteglæde!</i></p>
          <p><b>Program Følger</b></p>
        </div>

        <div class="event-container-right">
          <EntrancePrices />
          <!-- <TourPrices /> -->
        </div>
      </div>

      <div class="event-bot-container">
        <div class="event-image event-container-left">
          <img src="@/assets/images/plantemarkede.jpg" alt="Mennesker staar ved en bod" />
        </div>

        <div class="event-text-container event-container-right">
          <h2>What is the Plant market?</h2>
          <p>The Plant Market is a botanical paradise for garden enthusiasts, where you can go hunting for unique
            perennials, roses, lilies, bulbous plants, bushes, trees or you can find delicacies, handicrafts and
            treasures
            for the garden.You will find many stall holders from Denmark and abroad. There is a great opportunity to get
            a
            good price and a piece of advice along the way from the many competent and professional plant folk. Remember
            to bring a box or something to carry your plants and other treasures to avoid using plastic bags.</p>
          <p><b>Program update at a later date</b></p>
        </div>
      </div>

      <EventForm />
    </div>
  </main>

  <FooterComponent />
</template>
