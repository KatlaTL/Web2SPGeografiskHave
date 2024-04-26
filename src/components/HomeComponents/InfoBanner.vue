<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import InfoBannerTile from './InfoBannerTile.vue';

const router = useRouter();
const hasRoute = ref(false);

if (router.hasRoute("Calender")) {
    hasRoute.value = true;
}
</script>

<template>
    <section id="info-banner">
        <InfoBannerTile iconFileName="clock.svg" title="Åbningstider" infoText="Vinter // Alle dage fra kl. 10 – 16 "/>
        <InfoBannerTile iconFileName="tickets.svg" title="Priser" infoText="Entrebilletter og årskort "/>
        <RouterLink v-if="hasRoute" :to="{ name: 'Calender'}">
            <InfoBannerTile iconFileName="calender.svg" title="Kalender" infoText="Se kommende events og rundvisninger "/>
        </RouterLink>

        <InfoBannerTile v-else iconFileName="calender.svg" title="Kalender" infoText="Se kommende events og rundvisninger "/>
    </section>
</template>