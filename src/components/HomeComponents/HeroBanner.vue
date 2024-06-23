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
            <img :src="imageURL" :alt="imageAltText" class="block w-[1700px]"/>
        </div>
        <div class="absolute 
         mdsm:top-[33%] md:top-[39%] lg:top-[48%] xl:top-[41%] 2xl:top-[55%]
         color text-whiteColor">
            <h1 class="xsm:text-[15px] sm:text-[25px] mdsm:text-[30px] md:text-[40px] lg:text-[50px] font-semibold flex uppercase">{{ title }}</h1>
        </div>
    </section>
</template>