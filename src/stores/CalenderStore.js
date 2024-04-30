import {defineStore} from 'pinia'

export const calender = defineStore({
    id:'calendarstore',
    state: () => {
        return{
            src: null,
            date: null,
            titel: null,
            text: null
        }
    }
})