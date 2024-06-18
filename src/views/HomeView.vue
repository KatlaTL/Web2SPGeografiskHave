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
</script>

<template>
  <HeaderComponent />

  <main>
    <HeroBanner 
      :title="heroBanner.title" 
      :imageURL="heroBanner.imageURL" 
      :imageAltText="heroBanner.imageAltText" 
    />
    <InfoBanner />

    <section class="home-event-tiles-section 
    xsm:flex xsm:flex-col xsm:mx-10
    sm:mx-24 sm:flex-col
    mdsm:mx-32
    lg:flex-row lg:items-center lg:mx-auto
    xl:flex-none xl:flex-row xl:mx-auto xl:justify-between ">
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
