import { db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getCalenderBanner = async () => {
    try {
        const eventBannerRef = collection(db, "eventBanner");

        const eventBannerQuery = query(eventBannerRef, where("calenderBanner", "==", true));

        const querySnapshot = await getDocs(eventBannerQuery); // Have to use getDocs when using queries

        let result = {};

        querySnapshot.forEach(doc => {
            const data = doc.data();

            if (data?.calenderBanner) {
                result = { ...data }
            }
        })

        return {
            result,
            error: null
        };
    } catch (err) {
        return {
            result: null,
            error: err
        };
    }
}

export const getEventBanner = async (category) => {
    try {
        const eventBannerRef = collection(db, "eventBanner");

        const eventBannerQuery = query(eventBannerRef, where("category", "==", category));

        const querySnapshot = await getDocs(eventBannerQuery); // Have to use getDocs when using queries

        let result = {};
        
        querySnapshot.forEach(doc => {
            const data = doc.data();

            if (data?.category) {
                result = { ...data }
            }
        })

        return {
            result,
            error: null
        };
    } catch (err) {
        return {
            result: null,
            error: err
        };
    }
}