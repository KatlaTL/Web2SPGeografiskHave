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
            <img :src="imageURL" :alt="imageAltText" class="xsm:hidden sm:block"/>
        </div>
        <div class="absolute 
         mdsm:top-[25%] md:top-[25%] lg:top-[35%] xl:top-[35%]
         color text-whiteColor">
            <h1 class="">{{ title }}</h1>
        </div>
    </section>
</template>