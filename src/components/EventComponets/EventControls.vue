<script setup>
import '@/assets/styling/calendarViewStyle.css'
import { ref } from 'vue';

const emit = defineEmits(['ShowTours', 'ShowEvents']);


const searchQuery = ref('');

const tourBtnIsClicked = ref(false);
const eventBtnIsClicked = ref(false);

const showTours = () => {
  emit('showTours');
  tourBtnIsClicked.value = true;
  eventBtnIsClicked.value = false;
};

const showEvents = () => {
  emit('ShowEvents');
  tourBtnIsClicked.value = false;
  eventBtnIsClicked.value = true;
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