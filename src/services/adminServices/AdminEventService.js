import { db, storage } from "@/config/firebase";
import { formatDateRange } from "@/helpers/dateFormater";
import { Timestamp, addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
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
            thumbnailSrc: eventData?.previewThumbnailImageURL,
            thumbnailAltText: eventData?.thumbnailAltText,
            text: eventData?.tileText,
            title: eventData?.tileTitle,
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