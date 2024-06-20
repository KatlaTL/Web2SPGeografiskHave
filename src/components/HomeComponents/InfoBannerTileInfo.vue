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
  xsm:w-8 xsm:h-8 xsm:p-1 xsm:mr-2
  sm:w-10 sm:h-10 sm:pr-2 sm:mr-3
  mdsm:w-12 mdsm:h-12 mdsm:pr-2 mdsm:mr-3 
  md:w-14 md:h-14 md:pr-1 md:mr-5
  lg:w-auto lg:h-auto lg:mr-5" />
  <div class="info-banner-tile-text flex flex-col sm:justify-center mdsm:justify-between ">
    <h2 class="inline xsm:text-[14px] sm:text-[16px] mdsm:text-[16px] md:text-[20px] lg:text-[32px]">{{ title }}</h2>
    <p class="xsm:text-[8px] sm:text-[10px] mdsm:text-[12px] md:text-[12px] lg:text-[15px]
    xsm:hidden mdsm:flex font-bold
    ">{{ infoText }}</p>
  </div>
</template>
