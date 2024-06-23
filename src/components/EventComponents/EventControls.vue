<script setup>
import { ref } from 'vue';

const emit = defineEmits(['ShowTours', 'ShowEvents', 'searchInput']);


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

const emitInput = () => emit('searchInput', searchQuery.value);

</script>

<template>
    <div class="controls flex w-auto xsm:px-[10px] sm:px-[65px] mdsm:px-[235px] md:px-[195px] lg:px-[245px] lgxl:px-[300px] xl:px-[250px] 2xl:px-[246px]">
        <div class="control_div flex flex-row xsm:justify-between md:justify-end flex-wrap w-[100%] gap-4">
        <button @click.prevent="showTours" :class="{ 'clicked': tourBtnIsClicked }" class="showTours_btn shrink xsm:text-sm mdsm:text-sm xl:text-base">Rundvisning</button>
        <button @click.prevent="showEvents" :class="{ 'clicked': eventBtnIsClicked }" class="showEvents_btn shrink xsm:text-sm mdsm:text-sm xl:text-base">Events</button>
        <input type="text" @input="emitInput" v-model="searchQuery" placeholder="Søg event" class="mdsm::max-w-[200px] md:max-w-[200px] shrink xsm:text-sm mdsm:text-sm xl:text-base">
        </div>
    </div>
</template>