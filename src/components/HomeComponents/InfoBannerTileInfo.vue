<script setup>
import { computed } from "vue";

const props = defineProps({
  iconFileName: String,
  title: String,
  infoText: String,
});

const imageURL = computed(
  () => new URL(`/src/assets/icons/${props.iconFileName}`, import.meta.url).href
);
</script>

<template>
  <img :src="imageURL" class="
  sm:w-10 sm:h-10 mdsm:pr-2
   md:w-10 md:h-10 md:pr-4 
  lg:w-auto lg:h-auto lg:pr-6" />
  <div class="info-banner-tile-text flex flex-col justify-between ">
    <h2 class="inline mdsm:text-[16px] md:text-[20px] lg:text-[32px]">{{ title }}</h2>
    <p class="mdsm:text-[10px] md:text-[12px] lg:text-[15px]">{{ infoText }}</p>
  </div>
</template>
