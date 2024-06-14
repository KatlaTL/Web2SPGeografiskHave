<script setup>
defineProps({
    title: String,
    imageURL: String,
    imageAltText: String
})
</script>

<template>
    <section class="flex justify-center items-center">
        <div class=" ">
            <img :src="imageURL" :alt="imageAltText" class=""/>
        </div>
        <div class="absolute top-1/3 color text-whiteColor">
            <h1>{{ title }}</h1>
        </div>
    </section>
</template>