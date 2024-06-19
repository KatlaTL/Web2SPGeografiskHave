<script setup>
import { usePricesStore } from '@/stores/prices';
import { computed } from 'vue';

const pricesStore = usePricesStore();

const prices = computed(() => pricesStore.entrancePrices);

const defaultPrices = {
    adult: "185 kr.",
    students: "40 kr.",
    elderly: "65 kr.",
    children: "Gratis entré",
    members: "Medlemmer af Geografisk Haveklub og Geografisk Haves Venner har gratis entré."
}

</script>

<template>
    <div class="event-prices ">
        <div class="event-prices-inner">
            <h3>Entrépriser</h3>
            <ul>
                <li>Voksne: <span>{{ prices?.adult || defaultPrices.adult }}</span></li>
                <li>Studerende: <span>{{ prices?.students || defaultPrices.students }}</span></li>
                <li>Pensionister: <span>{{ prices.elderly || defaultPrices.elderly }}</span></li>
                <li>Børn under 18 år: <span>{{ prices.children || defaultPrices.children }}</span></li>
            </ul>
            <p><i>{{ prices.members || defaultPrices.members }}</i></p>
            <a href="https://www.place2book.com/da/sw2/sales/39pfs0v0xy" target="_blank"><i>Bestil dit
                    Haveklubmedlemskab her</i></a>
        </div>
    </div>
</template>