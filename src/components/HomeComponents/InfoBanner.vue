<script setup>
import InfoBannerTile from './InfoBannerTile.vue';
</script>

<template>
    <section id="info-banner">
        <InfoBannerTile iconFileName="clock.svg" title="Åbningstider" infoText="Vinter // Alle dage fra kl. 10 – 16 "/>
        <InfoBannerTile iconFileName="tickets.svg" title="Priser" infoText="Entrebilletter og årskort "/>
        <RouterLink :to="{ name: 'Calender'}">
            <InfoBannerTile iconFileName="calender.svg" title="Kalender" infoText="Se kommende events og rundvisninger "/>
        </RouterLink>
    </section>
</template>