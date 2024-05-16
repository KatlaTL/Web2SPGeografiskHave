import { db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getCalenderCategories = async (event) => {
  try {
    const tourRef = collection(db, "events");

    const calendarCategoryQuery = query(tourRef, where("category", "==", event));

    const querySnapshot = await getDocs(calendarCategoryQuery);

    const result = [];

    for (const doc of querySnapshot.docs) {
      result.push({
        id: doc.id,
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

export const searchInCalender = async (searchInput) => {
  try {
    const collectionRef = collection(db, "events");

    const searchQuery = query(collectionRef,  where("titel", "<=", searchInput + '\uf8ff'));

    const querySnapshot = await getDocs(searchQuery);

    const result = [];

    for (const doc of querySnapshot.docs) {
      result.push({
        id: doc.id,
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
}
