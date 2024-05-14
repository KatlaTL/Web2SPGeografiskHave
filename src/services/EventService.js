import { db } from "@/config/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

const _eventBannerRef = collection(db, "eventBanner");

export const getCalenderBanner = async () => {
    try {
        const eventBannerQuery = query(_eventBannerRef, where("calenderBanner", "==", true));

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

export const getEventBanner = async (category = "event") => {
    try {
        const eventBannerQuery = query(_eventBannerRef, where("category", "==", category));

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

export const getEventContentByID = async (eventID) => {
    try {
        if (!eventID) {
            throw "Missing eventID";
        }

        const collectionRef = collection(db, "events", eventID, "content");
        const querySnapshot = await getDocs(collectionRef);

        if (querySnapshot.empty) {
            throw "No content found";
        }

        let result = {};

        for (const doc of querySnapshot.docs) {
            const parentDocRef = doc.ref.parent.parent;
            const parentDocSnap = await getDoc(parentDocRef);

            result = { ...doc.data(), category: parentDocSnap.data()?.category };
        };

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