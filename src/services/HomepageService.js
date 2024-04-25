import { db } from "@/config/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const homepageTilesRef = collection(db, "homepageTiles");

export const getAllHomepageTiles = async () => {
    try {
        const q = query(homepageTilesRef, orderBy("createdAt"));

        const querySnapshot = await getDocs(q);

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
        console.error(err)
        return {
            result: null,
            error: err
        };
    }
}