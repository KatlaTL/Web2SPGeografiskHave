import { ref } from 'vue';
import { defineStore } from 'pinia';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '@/config/firebase';

export const useUserStore = defineStore('user', () => {
    const userObj = ref(null);

    const setUserOnAuthStateChange = () => {
        onAuthStateChanged(auth, (user) => {
            userObj.value = user;
        })
    }

    return { userObj, setUserOnAuthStateChange }
})