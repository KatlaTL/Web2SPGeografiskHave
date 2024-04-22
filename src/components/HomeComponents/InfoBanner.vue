<script setup>
import InfoBannerTiles from './InfoBannerTiles.vue';

</script>

<template>
    <div id="info-banner">
        <InfoBannerTiles iconFileName="clock.svg" title="Åbningstider" infoText="Vinter // Alle dage fra kl. 10 – 16 "/>
        <InfoBannerTiles iconFileName="tickets.svg" title="Priser" infoText="Entrebilletter og årskort "/>
        <RouterLink :to="{ name: 'Calender'}">
            <InfoBannerTiles iconFileName="calender.svg" title="Kalender" infoText="Se kommende events og rundvisninger "/>
        </RouterLink>
    </div>
</template>