<script setup>
const props = defineProps({
    imageURL: String,
    imageAltText: String
})

</script>

<template>
    <section id="event-banner" class="flex justify-center items-center">
        <div >
            <img :src="imageURL" :alt="imageAltText" />
        </div>
    </section>
</template>