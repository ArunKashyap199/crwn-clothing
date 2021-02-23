import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDn9ttEjaW0tkNG4kuS-FgDyeeEogHn6nk",
    authDomain: "crwn-db-e51e0.firebaseapp.com",
    databaseURL: "https://crwn-db-e51e0-default-rtdb.firebaseio.com",
    projectId: "crwn-db-e51e0",
    storageBucket: "crwn-db-e51e0.appspot.com",
    messagingSenderId: "791616034955",
    appId: "1:791616034955:web:71a12fc5f269ac86e69c8e",
    measurementId: "G-RZT221GMJW"
};

export const createUserProfileDocuments = async (userAuth, additionalData) => {
    console.log("creating API Req...");
    if (!userAuth) {
        console.log("Not Authorized");
        return;
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();


    if (!snapShot.exists) {
        console.log("No Snapshot");
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
        console.log("Snapshot", snapShot);
    }
    console.log("userRef: ", userRef);
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

/* Here we have include the provider which will take the user sign in from
firebase with the help of GoogleAuthProvider() */

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account '});


// Here we are passing the parameter of provider with is set for the Google Sign in
// Also we can pass it through other social media account user authentications
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;

