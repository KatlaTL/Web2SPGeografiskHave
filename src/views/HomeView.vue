<script setup>
import { ref, onBeforeMount } from "vue";
import HeaderComponent from "@/components/GlobalComponents/HeaderComponent.vue";
import FooterComponent from "@/components/GlobalComponents/FooterComponent.vue";
import HeroBanner from "@/components/HomeComponents/HeroBanner.vue";
import InfoBanner from "@/components/HomeComponents/InfoBanner.vue";
import EventTile from "@/components/HomeComponents/EventTile.vue";
import { getActiveHeroBanner, getAllHomepageTiles } from "@/services/HomepageService";

const heroBanner = ref({});
const tiles = ref([]);

onBeforeMount(async () => {
  const activeHeroBanner = await getActiveHeroBanner();
  
  if (activeHeroBanner.result) {
    heroBanner.value = activeHeroBanner.result;
  }
})

onBeforeMount(async () => {
  const homepageTiles = await getAllHomepageTiles(); 

  if (homepageTiles.result) {
    tiles.value = homepageTiles.result;
  }
})

  console.log(tiles);
</script>

<template>
  <HeaderComponent />

  <main class="xsm:h-[1200px] sm:h-[1400px] mdsm:h-auto">
    <HeroBanner 
      :title="heroBanner.title" 
      :imageURL="heroBanner.imageURL" 
      :imageAltText="heroBanner.imageAltText" 
    />
    <InfoBanner />

    <section class="home-event-tiles-section xsm:mt-8 mdsm:mt-28
     xsm:flex-col xsm:w-screen
    sm:flex-col sm:w-screen
    mdsm:flex-col mdsm:justify-center mdsm:items-center md:w-auto lgxl:justify-between mdsm:mx-0 md:mx-3
    lg:flex-none lg:flex-row  lg:justify-between lg:mx-3 
     xl:w-[1200px] xl:mx-auto">
      <EventTile v-for="tile in tiles" :key="tile.id" 
        :title="tile.title" 
        :tileText="tile.text"
        :imageURL="tile.imageURL" 
        :imageAltText="tile.imageAltText"
        :backgroundColor="tile.backgroundColor"
        :textColor="tile.textColor"
        :linkTextColor="tile.linkTextColor"
        :tileSubPage="tile.tileSubPage"
      />
    </section>
  </main>

  <FooterComponent />
</template>
