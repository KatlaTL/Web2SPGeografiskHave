<script setup>
import EntrancePrices from '@/components/EventComponets/EntrancePrices.vue';
import EventBanner from '@/components/EventComponets/EventBanner.vue';
import GDPRModal from '@/components/EventComponets/GDPRModal.vue';
import { getEventBanner } from '@/services/EventService';
import { onBeforeMount, ref } from 'vue';

const eventBanner = ref({})
const isModalOpened = ref(false);
const gdpr = ref(null);

onBeforeMount(async () => {
  const banner = await getEventBanner("tours"); // TO-DO make argument dynamic

  if (banner.result) {
    eventBanner.value = banner.result;
  }
})

const openModal = () => isModalOpened.value = true;

const closeModal = () => isModalOpened.value = false;

const acceptGDPR = () => {
  gdpr.value.disabled = false;
  gdpr.value.checked = true;
  isModalOpened.value = false
}

</script>

<template>
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

      <div class="event-registration">
        <div class="event-registration-info">
          <h2>Tilmelding til Plantemarked d. 25-26 maj 2024</h2>
          <p><i>Medlemmer af Geografisk Haveklub og Geografisk Haves Venner har gratis entré.</i></p>
          <a href="https://www.place2book.com/da/sw2/sales/39pfs0v0xy" target="_blank"><i>Bestil dit Haveklubmedlemskab
              her</i></a>
        </div>
        <div class="event-registration-form">
          <form>
            <fieldset class="form-input-required">
              <input id="input-name" type="text" placeholder="Navn" name="name" required />
              <label for="input-name">Navn</label>
            </fieldset>

            <fieldset class="form-phone-fieldset">
              <fieldset class="form-input-required">
                <input id="input-regionCode" type="text" placeholder="Landekode" name="regionCode" required />
                <label for="input-regionCode">Landekode</label>
              </fieldset>
              <fieldset class="form-input-required">
                <input id="input-phone" type="text" placeholder="Telefon nummer" name="phone" required>
                <label for="input-phone">Telefon nummer</label>
              </fieldset>
            </fieldset>

            <fieldset class="form-input-required">
              <input id="input-email" type="email" placeholder="E-mail" name="email" required>
              <label for="input-email">E-mail</label>
            </fieldset>

            <fieldset class="form-input-required">
              <input id="input-amount" type="text" name="amount" placeholder="Antal" required>
              <label for="input-amount">Antal</label>
            </fieldset>

            <fieldset class="form-input-checkbox">
              <fieldset>
                <input id="input-newsletter" type="checkbox" name="newsletter" />
                <label for="input-newsletter">Tilmeld vores nyhedsbrev</label>
              </fieldset>

              <fieldset>
                <input id="input-gdpr" type="checkbox" name="gdpr" ref="gdpr" required disabled>
                <label>Godkend <span @click="openModal">Privatlivspolitik</span></label>
              </fieldset>
            </fieldset>

            <button>Tilmeld</button>

            <GDPRModal :isOpen="isModalOpened" @modal-close="closeModal" @accept-gdpr="acceptGDPR" />
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
