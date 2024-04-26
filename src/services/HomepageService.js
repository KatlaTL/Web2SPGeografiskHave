import { db } from "@/config/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export const getAllHomepageTiles = async () => {
    try {
        const homepageTilesRef = collection(db, "homepageTiles");

        const homepageTilesQuery = query(homepageTilesRef, orderBy("createdAt"));

        const querySnapshot = await getDocs(homepageTilesQuery);

        const result = [];

        for (const doc of querySnapshot.docs) {
            const subCollectionRef = collection(db, doc.ref.path + "/tileSubPage");
            const subQuerySnapshot = await getDocs(subCollectionRef);

            result.push({
                id: doc.id,
                ...doc.data(),
                tileSubPage: subQuerySnapshot.docs[0]?.data()
            });
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

export const getActiveHeroBanner = async () => {
    try {
        const homepageHeroRef = collection(db, "homepageHeroBanner");

        const homepageHeroQuery = query(homepageHeroRef, where("activeBanner", "==", true));

        const querySnapshot = await getDocs(homepageHeroQuery);

        let result = {};

        querySnapshot.forEach(doc => {
            const data = doc.data();

            if (data?.activeBanner) {
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