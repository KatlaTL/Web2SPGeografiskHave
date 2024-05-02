import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getPrices } from '@/services/PricesServices'

export const usePricesStore = defineStore('prices', () => {
    const entrancePrices = ref({});
    const tourPrices = ref({});

    const loadEntrancePrices = async () => {
        const prices = await getPrices("entrance");
        if (prices.result) {
            entrancePrices.value = prices.result;
        }
    }

    const loadTourPrices = async () => {
        const prices = await getPrices("tour");
        if (prices.result) {
            tourPrices.value = prices.result;
        }
    }
    
    return { entrancePrices, tourPrices, loadEntrancePrices, loadTourPrices }
})