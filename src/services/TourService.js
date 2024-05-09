import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";



 const tours = await getDocs(collection(db, "tours"));

export let getTours = {};

tours.forEach(doc => getTours = { ...doc.data() })
