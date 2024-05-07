<script setup>
import "@/assets/styling/calendarViewStyle.css";
import { ref, watch, watchEffect } from "vue";
import controls from "@/components/EventComponets/EventControls.vue";
import { result } from '@/services/TourService';

console.log(result.titel);

const calendarDatas = ref([""]);

const Events = [
  [
    {
      src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/kamelia.webp",
      date: "marts 1 - 31 marts, 2024",
      titel: "Kamelia dage i Væksthuset",
      text: "Vi åbner væksthuset, så du kan komme i forårsstemning og nyde de mange blomstrende kameliaer.",
    },
    {
      src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/foraar.webp",
      date: "22 marts, 2024",
      titel: "Sommersæsonstart i 2024",
      text: "I Geografisk Have kan man virkelig få lov at nyde naturen i forårets tegn.",
    },
    {
      src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/pileflet.webp",
      date: "25 marts, 2024",
      titel: "Påskeferie // Pileflet workshop",
      text: "Lær at flette en lille kurv eller et plantestativ af pil",
    },

    {
      src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/rundvisning1.webp",
      date: "6 april , 2024",
      titel: "Rundvisning i Geografisk Have",
      text: "Vi åbner væksthuset, så du kan komme i forårsstemning og nyde de mange blomstrende kameliaer.",
    },
    {
      src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/marked.webp",
      date: "25 - 26 maj, 2024",
      titel: "Plantemarked 2024",
      text: "Årets Plantemarked afholdes i Geografisk Have lørdag d. 25. maj kl. 10-17 og søndag d. 26. maj kl. 10-17.",
    },
    {
      src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/skthans.webp",
      date: "23 juni, 2024",
      titel: "Sankthansaften 2024",
      text: "Lær at flette en lille kurv eller et plantestativ af pil",
    },

    {
      src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/faellesspisning.webp",
      date: "23 juni, 2024",
      titel: "Fællesspisning til Sankthans",
      text: "Kom til hyggelig fællesspisning med de andre haveklubmedlemmer til Sankthansaften. ",
    },
    {
      src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/trae.webp",
      date: "17 august, 2024",
      titel: "Havevandring og foredrag om træet",
      text: "Kom på en guidet havevandring og hør foredraget om sjældne træer i Geografisk Have med træeksperten Peter Hoffmann.",
    },
    {
      src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/foredrag.webp",
      date: "7 september, 2024",
      titel: "Grøn Have Festival 2024",
      text: "Kom til Grøn Have Festival og lær, hvordan du kan gøre din have endnu mere “grøn”.",
    },
  ],
];

const Tours = [
  [
    {
      src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/rundvisning1.webp",
      date: "marts 1 - 31 marts, 2024",
      titel: "Rundvisninger i Geografisk Have",
      text: "Vi åbner væksthuset, så du kan komme i forårsstemning og nyde de mange blomstrende kameliaer.",
    },
    {
      src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/rundvisning1.webp",
      date: "22 marts, 2024",
      titel: "Rundvisninger i Geografisk Have",
      text: "Vi åbner væksthuset, så du kan komme i forårsstemning og nyde de mange blomstrende kameliaer.",
    },
    {
      src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/rundvisning1.webp",
      date: "25 marts, 2024",
      titel: "Rundvisninger i Geografisk Have",
      text: "Vi åbner væksthuset, så du kan komme i forårsstemning og nyde de mange blomstrende kameliaer.",
    },

    {
      src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/rundvisning1.webp",
      date: "6 april , 2024",
      titel: "Rundvisninger i Geografisk Have",
      text: "Vi åbner væksthuset, så du kan komme i forårsstemning og nyde de mange blomstrende kameliaer.",
    },
    {
      src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/rundvisning1.webp",
      date: "25 - 26 maj, 2024",
      titel: "Rundvisninger i Geografisk Have",
      text: "Vi åbner væksthuset, så du kan komme i forårsstemning og nyde de mange blomstrende kameliaer.",
    },
    {
      src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/rundvisning1.webp",
      date: "23 juni, 2024",
      titel: "Rundvisninger i Geografisk Have",
      text: "Vi åbner væksthuset, så du kan komme i forårsstemning og nyde de mange blomstrende kameliaer.",
    },

    {
      src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/rundvisning1.webp",
      date: "23 juni, 2024",
      titel: "Rundvisninger i Geografisk Have",
      text: "Vi åbner væksthuset, så du kan komme i forårsstemning og nyde de mange blomstrende kameliaer.",
    },
    {
      src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/rundvisning1.webp",
      date: "17 august, 2024",
      titel: "Rundvisninger i Geografisk Have",
      text: "Vi åbner væksthuset, så du kan komme i forårsstemning og nyde de mange blomstrende kameliaer.",
    },
    {
      src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/rundvisning1.webp",
      date: "7 september, 2024",
      titel: "Rundvisninger i Geografisk Have",
      text: "Vi åbner væksthuset, så du kan komme i forårsstemning og nyde de mange blomstrende kameliaer.",
    },
  ],
];

watch(() => (calendarDatas.value = Events));
</script>

<template>
  <div class="calendarViewContainer">
    <controls
      @showTours="calendarDatas = Tours"
      @showEvents="calendarDatas = Events"
    />
    <div class="container_calendar">
      <div
        class="column_calendar"
        v-for="(calendarData, index) in calendarDatas"
        :key="index"
      >
        <div class="image-wrapper">
          <div
            class="image-container"
            v-for="(image, i) in calendarData"
            :key="i"
          >
            <img :src="image.src" :alt="'Image ' + (index * 2 + i + 1)" />
            <div class="image-overlay">
              <a href="#" class="read-more">Læs Mere</a>
            </div>
            <div class="info_container">
              <div class="date">
                <p>{{ image.date }}</p>
              </div>
              <div class="titel">
                <h3>{{ image.titel }}</h3>
              </div>
              <div class="text">
                <p>{{ image.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
