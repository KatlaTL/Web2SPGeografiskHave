import { db } from "@/config/firebase";
import { collection, getDocs, orderBy, query } from "@firebase/firestore";

export const getTopNavigationMenu = async () => {
    try {
        const navBarRef = collection(db, "navBar");

        const navBarQuery = query(navBarRef, orderBy("menuOrder"));

        const querySnapshot = await getDocs(navBarQuery);
        
        const result = [];

        for (const doc of querySnapshot.docs) {
            const subCollectionRef = collection(db, doc.ref.path + "/subNavigation");
            const subQuerySnapshot = await getDocs(subCollectionRef);

            result.push({
                id: doc.id,
                ...doc.data(),
                subNavigation: subQuerySnapshot.docs.map(doc => doc.data())
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