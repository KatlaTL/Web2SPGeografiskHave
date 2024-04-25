<script setup>
defineProps({
    title: String,
    imageURL: String,
    imageAltText: String
})
</script>

<template>
    <section id="hero-banner">
        <div id="hero-banner-image">
            <img :src="imageURL" :alt="imageAltText" />
        </div>
        <div id="hero-banner-title">
            <h1>{{ title }}</h1>
        </div>
    </section>
</template>