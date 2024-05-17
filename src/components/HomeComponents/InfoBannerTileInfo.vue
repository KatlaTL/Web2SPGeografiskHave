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
        <h2>{{ title }}</h2>
        <p>{{ infoText }}</p>
    </div>
</template>