import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";



 const tours = await getDocs(collection(db, "tours"));

export let result = {};

tours.forEach(doc => result = { ...doc.data() })

console.log(result);