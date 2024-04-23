<script setup>
import HeroBanner from "@/components/HomeComponents/HeroBanner.vue";
import InfoBanner from "@/components/HomeComponents/InfoBanner.vue";
import EventTile from "@/components/HomeComponents/EventTile.vue";
</script>

<template>
  <main>
    <HeroBanner />
    <InfoBanner />

    <section id="home-event-tiles-section">
      <EventTile title="Velkommen til haven (Kolding)"
        tileText="Geografisk Have er en 14 hektar stor, botanisk have i Kolding med et stort væksthus, legepladser, en populær dyrefold…"
        imageFileName="Velkommen.png" backgroundColor="#125F31" textColor="#ffffff" />

      <EventTile title="Geografisk Haveklub"
        tileText="Besøg Geografisk Have så tit du vil og kom gratis ind til de store særarrangementer. Følg dyrene tæt på…"
        imageFileName="Haveklub.jpg" backgroundColor="#f4a25a" textColor="#000000" linkTextColor="#000000" />

      <EventTile title="Velkommen til haven (Kolding)"
        tileText="Geografisk Have er en 14 hektar stor, botanisk have i Kolding med et stort væksthus, legepladser, en populær dyrefold…"
        imageFileName="Velkommen.svg" backgroundColor="#125F31" textColor="#ffffff" />

      <EventTile title="Geografisk Haveklub"
        tileText="Besøg Geografisk Have så tit du vil og kom gratis ind til de store særarrangementer. Følg dyrene tæt på…"
        imageFileName="Haveklub.svg" backgroundColor="#f4a25a" textColor="#000000" linkTextColor="#000000" />
    </section>
  </main>
</template>
