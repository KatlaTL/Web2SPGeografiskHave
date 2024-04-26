<script setup>
import { useRouter } from 'vue-router';
import InfoBannerTile from './InfoBannerTile.vue';

const router = useRouter();

const activeRouterName = (routeName) => {
    if (router.hasRoute(routeName)) {
        return routeName;
    }
    return null;
}
</script>

<template>
    <section id="info-banner">
        <InfoBannerTile iconFileName="clock.svg" title="Åbningstider" infoText="Vinter // Alle dage fra kl. 10 – 16 " />
        <InfoBannerTile iconFileName="tickets.svg" title="Priser" infoText="Entrebilletter og årskort " />
        <InfoBannerTile iconFileName="calender.svg" title="Kalender" infoText="Se kommende events og rundvisninger"
            :activeRouterName="activeRouterName('Calender')" />
    </section>
</template>