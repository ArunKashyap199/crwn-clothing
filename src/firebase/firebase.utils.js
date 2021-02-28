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
// firebase.initializeApp(config);
!firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

export const createUserProfileDocuments = async (userAuth, additionalData) => {
    console.log("creating API Req...");
    if (!userAuth) {
        console.log("Not Authorized");
        return;
    }
    // Match User From DB
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    // create new user
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

// To Add user and it's Collections documents into the database
// just to send our shop data into the firebase
export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    // Batching the record what is our app is being rendering at that page

    console.log("objectToAdd", objectToAdd);
    const batch = firestore.batch();
    objectToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
}

// getting the whole snapshot of shop page data

// doc getting the title and items name from collection.doc ( WHOLE )
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map((doc) => {
        const { title, items } = doc.data();
        return ({
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items,
        });
    });
    // transformedCollection = display the whole items in a array
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

/* Here we have include the provider which will take the user sign in from
firebase with the help of GoogleAuthProvider() */

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account ' });

// Here we are passing the parameter of provider with is set for the Google Sign in
// Also we can pass it through other social media account user authentications
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;


/**/