import { db } from "@/config/firebase";
import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "@firebase/firestore";

export const addNavBarItem = async (routerData) => {
    try {
        if (!routerData.routerName || !routerData.routerPath) {
            throw "Missing routerName or routerPath";
        }

        if (!routerData.routerPath.startsWith("/")) {
            routerData.routerPath = "/" + routerData.routerPath;
        }

        const collectionName = "navBar";

        const docRef = await addDoc(collection(db, collectionName), {
            menuOrder: routerData?.menuOrder,
            routerName: routerData?.routerName,
            routerPath: routerData?.routerPath,
            routerComponentName: routerData?.routerComponentName || "",
            routerMeta: {
                location: "navbar",
                title: routerData?.title || routerData?.routerName
            },
            createdAt: Timestamp.fromDate(new Date()),
            updatedAt: Timestamp.fromDate(new Date()),
        })

        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw "Failed at adding navigation item";
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

export const doesRouteExists = async (routerID) => {
    try {
        if (routerID === null) {
            return false;
        }

        if (routerID === "") {
            throw "Router ID missing";
        }

        const docRef = doc(db, "navBar", routerID);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return true;
        }

        return false;

    } catch (err) {
        return true;
    }
}

export const getRouteDataByName = async (routerName) => {
    try {
        const routerRef = collection(db, "navBar");

        const routerQuery = query(routerRef, where("routerName", "==", routerName));

        const querySnapshot = await getDocs(routerQuery); // Have to use getDocs when using queries

        let result = {};

        querySnapshot.forEach(doc => result = { ...doc.data(), id: doc.id })

        return {
            result,
            error: null
        };
    } catch (err) {
        return {
            result: null,
            error: {
                message: err,
                userFriendlyMessage: "Something went wrong, please try again"
            }
        }
    }
}

export const updateNavBarItem = async (routerID, data) => {
    try {
        if (!routerID) {
            throw "Missing routerID";
        }

        const collectionName = "navBar";

        const docRef = doc(db, collectionName, routerID);

        await updateDoc(docRef, { ...data, updatedAt: Timestamp.fromDate(new Date()) });

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

export const deleteNavBarItem = async (routerID) => {
    try {
        if (!routerID) {
            throw "Missing routerID";
        }

        const collectionName = "navBar";

        const docRef = doc(db, collectionName, routerID);

        await deleteDoc(docRef);

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