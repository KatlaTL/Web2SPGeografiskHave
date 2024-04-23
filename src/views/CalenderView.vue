<script setup>
import headerComponent from "@/components/HeaderComponent.vue"
import footerComponent from "@/components/FooterComponent.vue"
import '@/assets/styling/calendarViewStyle.css'
import { ref } from 'vue';

const columns = ref([
  [
    { src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/kamelia.webp", date: "marts 1 - 31 marts, 2024",titel:"Kamelia dage i Væksthuset", text: "Vi åbner væksthuset, så du kan komme i forårsstemning og nyde de mange blomstrende kameliaer." },
    { src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/rundvisning1.webp", date: "6 april , 2024", titel:"Rundvisning i Geografisk Have", text: "Vi åbner væksthuset, så du kan komme i forårsstemning og nyde de mange blomstrende kameliaer." },
    { src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/faellesspisning.webp", date: "23 juni, 2024", titel:"Fællesspisning til Sankthans", text: "Kom til hyggelig fællesspisning med de andre haveklubmedlemmer til Sankthansaften. " },
  ],
  [
    { src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/foraar.webp", date: "22 marts, 2024", titel:"Sommersæsonstart i 2024", text: "I Geografisk Have kan man virkelig få lov at nyde naturen i forårets tegn." },
    { src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/marked.webp", date: "25 - 26 maj, 2024", titel:"Plantemarked 2024", text: "Årets Plantemarked afholdes i Geografisk Have lørdag d. 25. maj kl. 10-17 og søndag d. 26. maj kl. 10-17." },
    { src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/trae.webp", date: "17 august, 2024", titel:"Havevandring og foredrag om træet", text: "Kom på en guidet havevandring og hør foredraget om sjældne træer i Geografisk Have med træeksperten Peter Hoffmann." },
  ],
  [
    { src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/pileflet.webp", date: "25 marts, 2024", titel:"Påskeferie // Pileflet workshop", text: "Lær at flette en lille kurv eller et plantestativ af pil" },
    { src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/skthans.webp", date: "23 juni, 2024", titel:"Sankthansaften 2024", text: "Lær at flette en lille kurv eller et plantestativ af pil" },
    { src: "src/images and icons/GH til Webudvikling/Billeder til hjemmesiden/foredrag.webp", date: "7 september, 2024", titel:"Grøn Have Festival 2024", text: "Kom til Grøn Have Festival og lær, hvordan du kan gøre din have endnu mere “grøn”." },
  ]
]);

const searchQuery = ref('');

    const showOldImages = () => {
      // Code to show old images
    };

    const showNewImages = () => {
      // Code to show new images
    };

    const isVisible = (index) => {
      // Logic to determine visibility based on search query or other conditions
      return true;
    };

</script>

<template>
  <main>
      <headerComponent/>
    <h1>CalenderView</h1>
    <div class="controls">
      <div class="control_div">
        <input type="text" v-model="searchQuery" placeholder="Search...">
        <button @click="showOldImages">Show Old Images</button>
        <button @click="showNewImages">Show New Images</button>
      </div>
    </div>
    <div class="container_calendar">
      <div class="column" v-for="(column, index) in columns" :key="index">
        <div v-if="isVisible(index)" class="image-wrapper">
          <div class="image-container" v-for="(image, i) in column" :key="i">
            <img :src="image.src" :alt="'Image ' + (index * 2 + i + 1)">
            <div class="info_container">
              <div class="date">{{ image.date }}</div>
              <div class="date"><h2>{{ image.titel }}</h2></div>
              <div class="text">{{ image.text }}</div>
            </div>
          </div>
        </div>
      </div>
  </div>
    <footerComponent/>
  </main>
</template>