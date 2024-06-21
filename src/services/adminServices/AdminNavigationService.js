import { db } from "@/config/firebase";
import { Timestamp, addDoc, collection, deleteDoc, doc, getCountFromServer, getDoc, getDocs, query, runTransaction, updateDoc, where, writeBatch } from "@firebase/firestore";

const _collectionName = "navBar";

export const addNavBarItem = async (routerData) => {
    try {
        if (!routerData.routerName || !routerData.routerPath) {
            throw "Missing routerName or routerPath";
        }

        if (!routerData.routerPath.startsWith("/")) {
            routerData.routerPath = "/" + routerData.routerPath;
        }

        const navBarCountResult = await countAllNavBarRoutes();

        if (navBarCountResult.error) {
            throw "Couldn't count all navbar routes";
        }

        const navBarCount = navBarCountResult?.count;

        const docRef = await addDoc(collection(db, _collectionName), {
            menuOrder: navBarCount + 1,
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
        const collectionRef = collection(db, "navBar");

        const routerQuery = query(collectionRef, where("routerName", "==", routerName));

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

        const docRef = doc(db, _collectionName, routerID);

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

        const docRef = doc(db, _collectionName, routerID);

        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw "No such navigation item";
        }

        const itemPosition = docSnap.data()?.menuOrder;

        if (!itemPosition) {
            throw "Item does not have a position";
        }

        const collectionRef = collection(db, _collectionName);

        const routerQuery = query(collectionRef, where("menuOrder", ">", itemPosition));

        const querySnapshot = await getDocs(routerQuery); // Have to use getDocs when using queries

        const result = querySnapshot.docs.map(doc => ({ docRef: doc.ref, positionID: doc.data().menuOrder }));

        if (result.length > 0) {
            const batch = writeBatch(db);

            result.forEach(doc => {
                batch.update(doc.docRef, {
                    menuOrder: doc.positionID - 1
                });
            })

            await batch.commit();
        }

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

export const changeOrderOfItem = async (routerID, direction) => {
    try {
        if (!routerID) {
            throw "Missing routerID";
        }

        if (!direction) {
            throw "Missing direction";
        }


        await runTransaction(db, async (transaction) => {
            const docRef = doc(db, _collectionName, routerID);

            const docSnap = await transaction.get(docRef);

            if (!docSnap.exists()) {
                throw "No such navigation item";
            }

            const docData = docSnap.data();

            const itemPosition = docData.menuOrder;

            if (!itemPosition) {
                throw "Item does not have a position";
            }

            const navBarCountResult = await countAllNavBarRoutes();

            if (navBarCountResult.error) {
                throw "Couldn't count all navbar routes";
            }

            const navBarCount = navBarCountResult?.count;
            const firstItem = 1;

            let swapItemPosition = null;

            if (direction === "left" && itemPosition > firstItem) {
                swapItemPosition = itemPosition - 1;
            } else if (direction === "right" && itemPosition < navBarCount) {
                swapItemPosition = itemPosition + 1;
            }

            if (!swapItemPosition) {
                throw "Nothing to swap with";
            }

            const swapItem = await getRouteDataByOrderNr(swapItemPosition, transaction);

            if (swapItem?.error) {
                throw swapItem.error?.message;
            }


            transaction.update(docRef, {
                menuOrder: swapItemPosition
            });

            transaction.update(swapItem.result?.docRef, {
                menuOrder: itemPosition
            });
        })

        return {
            error: null
        }

    } catch (err) {
        let message = err;

        if (err === "Nothing to swap with") {
            message = "Det er ikke muligt at flytte det menupunkt længere i denne retning";
        }

        return {
            error: {
                message: message,
                userFriendlyMessage: "Something went wrong, please try again"
            }
        }
    }
}

export const countAllNavBarRoutes = async () => {
    try {
        const collectionRef = collection(db, _collectionName);

        const collectionSnap = await getCountFromServer(collectionRef);

        return {
            error: null,
            count: collectionSnap.data().count
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

export const getRouteDataByOrderNr = async (positionID, transaction = null) => {
    try {
        const collectionRef = collection(db, _collectionName);

        const routerQuery = query(collectionRef, where("menuOrder", "==", positionID));

        const querySnapshot = await getDocs(routerQuery); // Have to use getDocs when using queries

        if (querySnapshot.empty) {
            throw "Zero items found with the given positionID";
        }

        let result = {};

        if (transaction) {
            for (const doc of querySnapshot.docs) {
                const docSnap = await transaction.get(doc.ref);

                result = { ...docSnap.data(), id: docSnap.id, docRef: docSnap.ref };
            };
        } else {
            querySnapshot.forEach(doc => result = { ...doc.data(), id: doc.id, docRef: doc.ref })
        }

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