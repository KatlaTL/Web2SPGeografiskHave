<script setup>
import { usePricesStore } from '@/stores/prices';
import { computed } from 'vue';

const pricesStore = usePricesStore();

const prices = computed(() => pricesStore.tourPrices);

const defaultPrices = {
    tourLength: "1,5 time",
    weekdayPrice: "50 kr.",
    weekendPrice: "60 kr.",
    minParticipants: 15,
    maxParticipants: 30,
    weekdayInterval: "kl. 10-18",
    weekendHourStart: "kl. 18"
}

</script>

<template>
    <div class="event-prices">
        <div class="event-prices-inner">
            <h3>Pris for rundvisning</h3>

            <p>Rundvisningen foregår i {{ prices?.tourLength || defaultPrices.tourLength }}.</p>

            <p><span>Hverdage ({{ prices?.weekdayInterval || defaultPrices.weekdayInterval }}):</span> {{ prices?.weekdayPrice || defaultPrices.weekdayPrice }}</p>

            <p><span>Weekender/helligdage og hverdage efter {{ prices?.weekendHourStart || defaultPrices.weekendHourStart }}:</span> {{ prices?.weekendPrice || defaultPrices.weekendPrice }}</p>

            <p>
                <i>Minimum antal deltagere er {{ prices?.minParticipants || defaultPrices.minParticipants }} personer for at holdet oprettes.</i><br />
                <i>Maksimum antal deltagere er {{ prices?.maxParticipants || defaultPrices.maxParticipants }} personer. Der skal desuden betales entré.</i>
            </p>
        </div>
    </div>
</template>

<style scoped>
h3 {
    color: #EDE9E9;
}

p {
    color: #EDE9E9;
}

p span {
    font-weight: 700;
    font-size: 16px;
    line-height: 21.79px;
}
</style>