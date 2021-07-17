import { firestore } from './firebase';

export const getItemsCollectionRef = () => firestore.collection('items');

export const getItemRef = (itemUid: string | undefined) => getItemsCollectionRef().doc(itemUid);