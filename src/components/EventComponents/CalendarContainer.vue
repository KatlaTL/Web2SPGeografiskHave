<script setup>
import "@/assets/styling/calendarViewStyle.css";
import { ref, watch, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import controls from "@/components/EventComponents/EventControls.vue";
import { getCalenderCategories, searchInCalender } from "@/services/TourService";

const calendarDatas = ref([]);

const calendarDataTour = ref([]);

const calendarDataEvent = ref([]);

onBeforeMount(async () => {
  const calenderCategoriesTour = await getCalenderCategories("tour");

  if (calenderCategoriesTour.result) {
    calendarDataTour.value = calenderCategoriesTour.result;
  }
});

onBeforeMount(async () => {
  const calenderCategoriesEvent = await getCalenderCategories("event");

  if (calenderCategoriesEvent.result) {
    calendarDataEvent.value = calenderCategoriesEvent.result;
  }
});

watch(calendarDataEvent, () => (calendarDatas.value = calendarDataEvent.value));

const router = useRouter();

const search = async (searchQuery) => {
  console.log(searchQuery)
  const result = await searchInCalender(searchQuery);
  console.log(result)
}
</script>

<template>
  <div class="calendarViewContainer">
    <controls
      @showTours="calendarDatas = calendarDataTour"
      @showEvents="calendarDatas = calendarDataEvent"
      @searchInput="(searchQuery) => search(searchQuery)"
    />
    <div class="container_calendar">
      <div class="image-wrapper">
        <div
          class="column_calendar"
          v-for="(calendarDatas, index) in calendarDatas"
          :key="index"
          @click="
            router.push({
              name: 'Event',
              params: { eventID: calendarDatas.id },
            })
          "
        >
          <div class="image-container">
            <img :src="calendarDatas.src" :alt="'Image ' + (index * 2 + 1)" />
            <div class="overlay">
              <p class="overlay_text">Læs mere</p>
            </div>
          </div>

          <div class="info_container">
            <div class="date">
              <p>{{ calendarDatas.date }}</p>
            </div>
            <div class="titel">
              <h3>{{ calendarDatas.titel }}</h3>
            </div>
            <div class="text">
              <p>{{ calendarDatas.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
