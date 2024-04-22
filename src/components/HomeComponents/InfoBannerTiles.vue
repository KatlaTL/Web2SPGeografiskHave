<script setup>
defineProps({
    iconFileName: String,
    title: String,
    infoText: String
})
</script>

<template>
    <div class="info-banner-tile">
        <img :src="`src/assets/icons/${iconFileName}`" />
        <div class="info-banner-tile-text">
            <h2>{{ title }}</h2>
            <p>{{ infoText }}</p>
        </div>
    </div>
</template>