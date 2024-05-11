import { db } from "@/config/firebase";
import { validateEmail } from "@/helpers/validate";
import { Timestamp, addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const eventSignup = async (eventID, data) => {
    try { 
        if (!eventID) {
            throw "Missing eventID";
        }

        if (!data) {
            throw "Missing data";
        }

        const collectionName = "eventSignup";

        const docRef = doc(db, collectionName, eventID);
        let docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            await setDoc(docRef, {
                totalParticipants: 0,
                createdAt: Timestamp.fromDate(new Date())
            })

            docSnap = await getDoc(docRef);
        }

        if (!docSnap.exists()) {
            throw "Failed to create document with event ID";
        }

        const docData = await docSnap.data();

        await updateDoc(docRef, {
            totalParticipants: docData.totalParticipants + (data?.numberOfParticipants || 0)
        });

        const subCollectionDocRef = await addDoc(collection(db, collectionName, eventID, "signups"), data);

        const subCollectionDocSnap = await getDoc(subCollectionDocRef);

        if (!subCollectionDocSnap.exists()) {
            throw "Failed to create subcollection document for signups"
        }

        return {
            error: null
        }
        
    } catch (err) {
        return {
            error: {
                message: err,
                userFriendlyMessage: "Something went wrong, please try again"
            }
        }
    }
}

export const newsletterSignup = async (email, name) => {
    try {
        if (email === "" || name === "") {
            throw "Missing email or name";
        } else if (!validateEmail(email)) {
            throw "Invalid email";
        }

        const collectionName = "newsletterSignups";

        await addDoc(collection(db, collectionName), {
            email,
            name,
            activeSubscriber: true,
            createdAt: Timestamp.fromDate(new Date()),
            updatedAt: Timestamp.fromDate(new Date()),
        })
    } catch (err) {
        return {
            error: {
                message: err,
                userFriendlyMessage: "Something went wrong, please try again"
            }
        }
    }
}