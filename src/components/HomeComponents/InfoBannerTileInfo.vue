<script setup>
import { computed } from 'vue';

const props = defineProps({
    iconFileName: String,
    title: String,
    infoText: String,
})

const imageURL = computed(() => new URL(`/src/assets/icons/${props.iconFileName}`, import.meta.url).href)
</script>

<template>
    <img :src="imageURL" />
    <div class="info-banner-tile-text">
        <h2 class="inline text-[32px]">{{ title }}</h2>
        <p class="text-[15px]">{{ infoText }}</p>
    </div>
</template>