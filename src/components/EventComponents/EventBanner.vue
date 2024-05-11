<script setup>
const props = defineProps({
    imageURL: String,
    imageAltText: String
})

</script>

<template>
    <section id="event-banner">
        <div id="event-banner-image">
            <img :src="imageURL" :alt="imageAltText" />
        </div>
    </section>
</template>