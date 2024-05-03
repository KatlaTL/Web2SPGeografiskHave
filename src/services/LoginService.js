import { auth, db } from "@/config/firebase";
import { setDoc } from "@firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@firebase/auth";

export const adminRegister = async (email, password) => {
    try {
        if (!email || !password) {
            throw "Email or password missing";
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        if (!userCredential) {
            throw "User Credential missing";
        }

        await setDoc(doc(db, "users", userCredential.user.uid), {
            userEmail: email,
            createdAt: userCredential.user.metadata.creationTime,
            lastSignIn: userCredential.user.metadata.lastSignInTime,
        })

        return {
            error: null,
            success: true
        }
    } catch (err) {
        return constructErrorObj(err);
    }
}

export const adminLogin = async (email, password) => {
    try {
        if (!email || !password) {
            throw "Email or password missing";
        }

        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        if (!userCredential) {
            throw "User Credential missing";
        }

        return {
            error: null,
            success: true
        }
    } catch (err) {
        return constructErrorObj(err);
    }
}

export const adminLogout = async () => {
    try {
        const success = await signOut(auth)
            .then(() => ({ success: true }))
            .catch((err) => { throw err });

        return {
            error: null,
            success: success
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

const constructErrorObj = (err) => {
    let userFriendlyMessage = "Something went wrong, please try again";

    switch (err.code) {
        case "auth/invalid-credential":
            userFriendlyMessage = "Ugyldige credentials";
            break;
        case "auth/invalid-email":
            userFriendlyMessage = "Ugyldige email";
            break;
        case "auth/weak-password":
            userFriendlyMessage = "Password skal være minimum 6 tegn";
            break;
    }

    return {
        error: {
            message: err,
            userFriendlyMessage: userFriendlyMessage
        }
    }
}