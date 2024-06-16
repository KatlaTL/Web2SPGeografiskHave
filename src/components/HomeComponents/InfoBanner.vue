<script setup>
import { useRouter } from "vue-router";
import InfoBannerTile from "./InfoBannerTile.vue";

const router = useRouter();

const activeRouterName = (routeName) => {
  if (router.hasRoute(routeName)) {
    return routeName;
  }
  return null;
};
</script>

<template>
  <section
    class="absolute m-auto left-0 right-0 
    mdsm:top-[40%] md:top-[46%] lg:top-[65%]
    flex flex-row 
    md:my-4 md:p-8 lg:my-4 lg:p-8
     bg-yellowColor
     md:w-[850px] lg:w-max"
  >
    <InfoBannerTile
      iconFileName="clock.svg"
      title="Åbningstider"
      infoText="Vinter // Alle dage fra kl. 10 – 16 "
    />
    <InfoBannerTile
      iconFileName="tickets.svg"
      title="Priser"
      infoText="Entrebilletter og årskort "
    />
    <InfoBannerTile
      iconFileName="calender.svg"
      title="Kalender"
      infoText="Se kommende events og rundvisninger"
      :activeRouterName="activeRouterName('Calender')"
    />
  </section>
</template>
