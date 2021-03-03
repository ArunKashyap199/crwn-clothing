import {takeLatest, put} from 'redux-saga/effects';
import {firestore, convertCollectionsSnapshotToMap} from "../../firebase/firebase.utils";

import shopActionTypes from "./shop.types";
import {fetchCollectionsFailure, fetchCollectionsSuccess} from "./shop.actions";

export function* fetchCollectionsAsync() {
    //Redux-Saga Code is here...
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield convertCollectionsSnapshotToMap(snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch(error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        shopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}