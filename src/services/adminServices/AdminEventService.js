import { db, storage } from "@/config/firebase";
import { formatDateRange } from "@/helpers/dateFormater";
import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, runTransaction, updateDoc, writeBatch } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const _collectionName = "events";

export const createEvent = async (eventData) => {
    try {
        if (!eventData) {
            throw "Missing event data";
        }

        const docRef = await addDoc(collection(db, _collectionName), {
            category: eventData?.category,
            date: formatDateRange(eventData?.date),
            dateRange: eventData?.date,
            thumbnailSrc: eventData?.previewThumbnailImageURL,
            thumbnailAltText: eventData?.thumbnailAltText,
            text: eventData?.tileText,
            titel: eventData?.tileTitle,
            createdAt: Timestamp.fromDate(new Date()),
            updatedAt: Timestamp.fromDate(new Date()),
        })

        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw "Failed to create event";
        }

        const subCollectionDocRef = await addDoc(collection(db, _collectionName, docSnap.id, "content"), {
            contentHeading: eventData?.contentHeading,
            firstParagraph: eventData?.firstParagraph,
            secondParagraph: eventData?.secondParagraph,
            formText: eventData?.formText,
            imageURL: eventData?.previewContentImageURL,
            imageAltText: eventData?.contentImageAltText
        });

        const subCollectionDocSnap = await getDoc(subCollectionDocRef);

        if (!subCollectionDocSnap.exists()) {
            throw "Failed to create subcollection document for event";
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

export const getAllEvents = async () => {
    try {
        const eventRef = collection(db, _collectionName);

        const querySnapshot = await getDocs(eventRef);

        const result = [];

        for (const doc of querySnapshot.docs) {
            const subCollectionRef = collection(db, doc.ref.path + "/content");
            const subQuerySnapshot = await getDocs(subCollectionRef);

            result.push({
                id: doc.id,
                ...doc.data(),
                content: subQuerySnapshot.docs.map(doc => doc.data())[0]
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

export const updateEvent = async (eventID, eventData) => {
    try {
        if (!eventID) {
            throw "Missing eventID";
        }

        const batch = writeBatch(db);

        const docRef = doc(db, _collectionName, eventID);

        const querySnapshot = await getDocs(collection(db, _collectionName, eventID, "content"));

        let subCollectionDocRef = null;

        for (const doc of querySnapshot.docs) {
            subCollectionDocRef = doc.ref;
        }

        batch.update(docRef, {
            category: eventData?.category,
            date: formatDateRange(eventData?.date),
            dateRange: eventData?.date,
            thumbnailSrc: eventData?.previewThumbnailImageURL,
            thumbnailAltText: eventData?.thumbnailAltText,
            text: eventData?.tileText,
            titel: eventData?.tileTitle,
            updatedAt: Timestamp.fromDate(new Date()),
        });

        batch.update(subCollectionDocRef, {
            contentHeading: eventData?.contentHeading,
            firstParagraph: eventData?.firstParagraph,
            secondParagraph: eventData?.secondParagraph,
            formText: eventData?.formText,
            imageURL: eventData?.previewContentImageURL,
            imageAltText: eventData?.contentImageAltText
        });

        await batch.commit();

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

export const deleteEvent = async (eventID) => {
    try {
        if (!eventID) {
            throw "Missing eventID";
        }

        const docRef = doc(db, _collectionName, eventID);

        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw "No such event";
        }

        await deleteDoc(docRef);

        return {
            error: null
        }

    } catch (err) {
        console.log(err)
        return {
            error: {
                message: err,
                userFriendlyMessage: "Something went wrong, please try again"
            }
        }
    }
}

export const doesEventExists = async (eventID) => {
    try {
        if (eventID === null) {
            return false;
        }

        if (eventID === "") {
            throw "Event ID missing";
        }

        const docRef = doc(db, _collectionName, eventID);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return true;
        }

        return false;

    } catch (err) {
        return true;
    }
}

export const uploadImageToStorage = (fileData, filePath) => {
    try {
        const reference = ref(storage, filePath + fileData.name);

        return new Promise((resolve, reject) => {
            uploadBytes(reference, fileData)
                .then(snapshot => {
                    getDownloadURL(snapshot.ref)
                        .then(url => resolve(url))
                        .catch(err => reject(err))
                })
                .catch(err => reject(err))
        });
    } catch (err) {
        return new Promise((_, reject) => reject(err));
    }
}