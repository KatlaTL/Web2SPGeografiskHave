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
  <div class="info-banner-tile-text flex flex-col sm:justify-end mdsm:justify-between ">
    <h2 class="inline xsm:text-[14px] sm:text-[16px] mdsm:text-[16px] md:text-[20px] lg:text-[32px]">{{ title }}</h2>
    <p class="xsm:text-[8px] sm:text-[10px] mdsm:text-[12px] md:text-[12px] lg:text-[15px]
    xsm:hidden mdsm:flex
    ">{{ infoText }}</p>
  </div>
</template>
