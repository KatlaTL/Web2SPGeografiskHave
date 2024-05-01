<script setup>
import '@/assets/styling/calendarViewStyle.css'
import { ref } from 'vue';

const emit = defineEmits(['ShowTours', 'ShowEvents']);


const searchQuery = ref('');

const showTours = () => {
  console.log("tour btn clicked");
  emit('showTours');
};

const showEvents = () => {
  console.log("event btn clicked");
  emit('ShowEvents');
};


</script>

<template>
    <div class="controls">
        <div class="control_div">
        <button @click.prevent="showTours" :class="{ 'clicked': tourBtnIsClicked }" class="showTours_btn">Rundvisning</button>
        <button @click.prevent="showEvents" :class="{ 'clicked': eventBtnIsClicked }" class="showEvents_btn">Events</button>
        <input type="text" v-model="searchQuery" placeholder="Søg event">
        </div>
    </div>
</template>