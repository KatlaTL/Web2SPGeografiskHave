<script setup>
import "@/assets/styling/calendarViewStyle.css";
import { ref, watch, watchEffect } from "vue";
import controls from "@/components/EventComponets/EventControls.vue";
import { getTours } from '@/services/TourService';

/* console.log(getTours); */

const calendarDatas = ref([""]);

const Events = [

];

const Tours = [
  [
  getTours
  ]
];

console.log(Tours);
console.log(calendarDatas);

watch(() => (calendarDatas.value = Tours));
</script>

<template>
  <div class="calendarViewContainer">
    <controls
      @showTours="calendarDatas = Tours"
      @showEvents="calendarDatas = Events"
    />
    <div class="container_calendar">
      <div
        class="column_calendar"
        v-for="(calendarData, index) in calendarDatas"
        :key="index"
      >
        <div class="image-wrapper">
          <div
            class="image-container"
            v-for="(image, i) in calendarData"
            :key="i"
          >
            <img :src="image.src" :alt="'Image ' + (index * 2 + i + 1)" />
            <div class="image-overlay">
              <a href="#" class="read-more">Læs Mere</a>
            </div>
            <div class="info_container">
              <div class="date">
                <p>{{ image.date }}</p>
              </div>
              <div class="titel">
                <h3>{{ image.titel }}</h3>
              </div>
              <div class="text">
                <p>{{ image.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
