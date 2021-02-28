import {createSelector} from "reselect";

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
);

// this function is converting the objects into the string with th help of shop.data
export const selectCollectionForPreview = createSelector(
    [selectCollections],
    (collections) =>
        collections ? Object.keys(collections).map(key => collections[key]) : []
);
// Collection Page For Each Collection
export const selectCollection = collectionUrlParam => {
    return createSelector(
        [selectCollections],
        collections => (collections ? collections[collectionUrlParam] : null)
    );
};

