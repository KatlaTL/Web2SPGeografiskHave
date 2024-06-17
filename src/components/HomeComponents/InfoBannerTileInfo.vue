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
  <img :src="imageURL" class="mdsm:w-6 mdsm:h-6 md:w-10 md:h-10 lg:w-auto lg:h-auto" />
  <div class="info-banner-tile-text">
    <h2 class="inline mdsm:text-[16px] md:text-[20px] lg:text-[32px]">{{ title }}</h2>
    <p class="mdsm:text-[12px] md:text-[12px] lg:text-[15px]">{{ infoText }}</p>
  </div>
</template>
