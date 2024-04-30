<script setup>
import '@/assets/styling/calendarViewStyle.css'
import { ref } from 'vue';

const props = defineProps(['title']);
console.log(props);

const searchQuery = ref('');

const showTours = () => {
  props.value = Tours;

};

const showEvents = () => {
  props.value = Events;
};


</script>

<template>
    <div class="controls">
        <div class="control_div">
        <button @click="showTours" :class="{ 'clicked': tourBtnIsClicked }" class="showTours_btn">Rundvisning</button>
        <button @click="showEvents" :class="{ 'clicked': eventBtnIsClicked }" class="showEvents_btn">Events</button>
        <input type="text" v-model="searchQuery" placeholder="Søg event">
        </div>
    </div>
</template>