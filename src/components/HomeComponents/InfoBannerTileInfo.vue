<script setup>
defineProps({
    iconFileName: String,
    title: String,
    infoText: String,
})
</script>

<template>
    <img :src="`src/assets/icons/${iconFileName}`" />
    <div class="info-banner-tile-text">
        <h2>{{ title }}</h2>
        <p>{{ infoText }}</p>
    </div>
</template>