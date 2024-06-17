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
    class="mdsm:absolute m-auto left-0 right-0 
    mdsm:top-[45%] md:top-[46%] lg:top-[64%] xl:top-[66%]
    flex justify-evenly sm:flex-col mdsm:flex-row
    mdsm:p-2 md:p-6 lg:p-6
     bg-yellowColor
     md:w-screen lg:w-screen xl:w-[1200px]"
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
