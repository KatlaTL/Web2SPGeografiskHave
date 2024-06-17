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
    class="sm:flex mdsm:absolute m-auto left-0 right-0 
    mdsm:top-[40%] md:top-[40%] lg:top-[64%] xl:top-[66%]
    flex justify-center sm:flex-col mdsm:flex-row
    mdsm:p-2 md:p-8 lg:my-4 lg:p-8
     bg-yellowColor
     md:w-screen lg:w-screen xl:w-max"
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
