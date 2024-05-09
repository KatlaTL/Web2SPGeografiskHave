import { db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getTours = async () => {
  try {
    const tourRef = collection(db, "tours");

    const querySnapshot = await getDocs(tourRef);

    const result = [];

    for (const doc of querySnapshot.docs) {
      result.push({
        ...doc.data(),
      });
    }

    return {
      result,
      error: null,
    };
  } catch (err) {
    return {
      result: null,
      error: err,
    };
  }
};
