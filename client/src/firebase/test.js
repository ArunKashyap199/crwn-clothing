import firebase from 'firebase/app';
import 'firebase/firestore';

const firebase = firebase.firestore();

// Methods to fetch item from the firebase
// Users, cartItems are the collections and with their unique Id

firestore.collect('users').doc('ifB1GzXFYDDbh218KfNa').collect('cartItems').doc('B44mAwIgiImuw37BdakS');
firestore('/users/ifB1GzXFYDDbh218KfNa/cartItems/B44mAwIgiImuw37BdakS');
firestore('/users/ifB1GzXFYDDbh218KfNa/cartItems');


export default firebase;

// const firebase = firebase.firestore();
// firestore.collection('users');
// This query is for us accessing the elements of users collection.
// This query is for us accessing the elements of users collection.