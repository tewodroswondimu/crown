import { createSelector } from 'reselect';

const selectShop = state => state.shop; 

export const selectCollections = createSelector(
    [selectShop], 
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections], 
    collections => collections ? Object.values(collections) : []
)

export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    collections => collections ? collections[collectionUrlParam] : null
    // when using an array, instead of an object 
    // collections.find(
    //     collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    // )
)