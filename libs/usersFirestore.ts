import { firestore } from './firebase';

export const getUsersCollectionRef = () => firestore.collection('users');

export const getUserRef = (userUid: string | undefined) => getUsersCollectionRef().doc(userUid);