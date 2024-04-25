<script setup>
import { ref, watchEffect } from "vue";

import HeroBanner from "@/components/HomeComponents/HeroBanner.vue";
import InfoBanner from "@/components/HomeComponents/InfoBanner.vue";
import EventTile from "@/components/HomeComponents/EventTile.vue";
import { getAllHomepageTiles } from "@/services/HomepageService";


const tiles = ref([]);

watchEffect(async () => {
  const homepageTiles = await getAllHomepageTiles(); 

  if (homepageTiles.result) {
    tiles.value = homepageTiles.result;
  } else if (homepageTiles.error) {
    tiles.value = (await getAllHomepageTiles()).result; // If error try once more
  }
}) 

</script>

<template>
  <main>
    <HeroBanner />
    <InfoBanner />

    <section id="home-event-tiles-section">
      <EventTile v-for="tile in tiles" :key="tile.id" 
        :title="tile.title" 
        :tileText="tile.text"
        :imageURL="tile.imageURL" 
        :backgroundColor="tile.backgroundColor"
        :textColor="tile.textColor"
        :linkTextColor="tile.linkTextColor"
        :tileSubPage="tile.tileSubPage"
      />
    </section>
  </main>
</template>
