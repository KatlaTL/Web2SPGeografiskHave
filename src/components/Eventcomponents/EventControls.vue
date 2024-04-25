<script setup>
import '@/assets/styling/calendarViewStyle.css'
import { ref } from 'vue';

const searchQuery = ref('');

const showTours = () => {
  calendarDatas.value = Tours;

};

const showEvents = () => {
  calendarDatas.value = Events;
};
</script>

<template>
    <div class="controls">
        <div class="control_div">
        <button @click="showTours">Rundvisning</button>
        <button @click="showEvents">Events</button>
        <input type="text" v-model="searchQuery" placeholder="Søg event">
        </div>
    </div>
</template>