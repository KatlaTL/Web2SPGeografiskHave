import { db } from "@/config/firebase";
import { collection, getDocs, query, where } from "@firebase/firestore";

export const getPrices = async (type) => {
    try {
        const pricesRef = collection(db, "prices");

        const pricesQuery = query(pricesRef, where("type", "==", type));

        const querySnapshot = await getDocs(pricesQuery); // Have to use getDocs when using queries

        let result = {};

        querySnapshot.forEach(doc => result = { ...doc.data() })

        return {
            result,
            error: null
        };
    } catch (err) {
        return {
            error: {
                message: err,
                userFriendlyMessage: "Something went wrong, please try again"
            }
        }
    }
}