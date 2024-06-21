import { db, storage } from "@/config/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const _collectionName = "events";

export const addEvent = () => {

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
        console.log(err);
    }
}