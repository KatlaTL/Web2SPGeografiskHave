<script setup>
import InfoBannerTileInfo from './InfoBannerTileInfo.vue';

defineProps({
    iconFileName: String,
    title: String,
    infoText: String,
    activeRouterName: String
})
</script>

<template>
    <section class="info-banner-tile ">
        <RouterLink v-if="activeRouterName" :to="{ name: activeRouterName }">
            <InfoBannerTileInfo :iconFileName="iconFileName" :title="title" :infoText="infoText" />
        </RouterLink>

        <InfoBannerTileInfo v-else :iconFileName="iconFileName" :title="title" :infoText="infoText" />
    </section>
</template>