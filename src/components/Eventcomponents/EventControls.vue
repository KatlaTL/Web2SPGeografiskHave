<script setup>
import '@/assets/styling/calendarViewStyle.css'
import { ref } from 'vue';

 const emit = defineEmits(['title']);


const searchQuery = ref('');

const showTours = () => {
  console.log("tour btn clicked");
  emit('title','hello');
};

const showEvents = () => {
  console.log("event btn clicked");
 /*  props.value = Events; */
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