import {takeLatest, put, call, all} from 'redux-saga/effects';
import {firestore, convertCollectionsSnapshotToMap} from "../../firebase/firebase.utils";

import shopActionTypes from "./shop.types";
import {fetchCollectionsFailure, fetchCollectionsSuccess} from "./shop.actions";

export function* fetchCollectionsAsync() {
    //Redux-Saga Code is here...
    try {
        // getting collection
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield convertCollectionsSnapshotToMap(snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch(error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}
// dispatch function call here of shop page
export function* fetchCollectionsStart() {
    yield takeLatest(
        shopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}

// sending these sagas to the root saga
export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart),
    ]);
}