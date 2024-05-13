<script setup>
import "@/assets/styling/calendarViewStyle.css";
import { ref, watch, watchEffect, onBeforeMount } from "vue";
import controls from "@/components/EventComponets/EventControls.vue";
import { getTours } from "@/services/TourService";


const calendarDatas = ref([]);

onBeforeMount(async () => {
  const Tours = await getTours();

  if (Tours.result) {
    calendarDatas.value = Tours.result;
  }
});
watch(() => (calendarDatas = Tours));

console.log(calendarDatas.value);

const Events = [];
</script>

<template>
  <div class="calendarViewContainer">
    <controls
      @showTours="calendarDatas = Tours"
      @showEvents="calendarDatas = Events"
    />
    <div class="container_calendar">
      <div class="image-wrapper">
        <div
          class="column_calendar"
          v-for="(calendarData, index) in calendarDatas"
          :key="index"
        >
          <div class="image-container">
            <img
              :src="calendarData.src"
              :alt="'Image ' + (index * 2 + i + 1)"
            />
          </div>
          <div class="image-overlay">
            <a href="#" class="read-more">Læs Mere</a>
          </div>
          <div class="info_container">
            <div class="date">
              <p>{{ calendarData.date }}</p>
            </div>
            <div class="titel">
              <h3>{{ calendarData.titel }}</h3>
            </div>
            <div class="text">
              <p>{{ calendarData.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
