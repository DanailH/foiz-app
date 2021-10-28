import * as React from 'react';
import { getItemsCollectionRef } from '../libs/itemsFirestore';
import useUserUid from './useUserUid';

export default function useUserItems() {
  const userUid = useUserUid();
  const [userItems, setUserItems] = React.useState<any>([]);

  React.useEffect(() => {
    refreshUserItems();
  }, [userUid]);

  const getUserItems = async () => {
    const itemsSnapshot = await getItemsCollectionRef().where('user', '==', userUid).get();
    return itemsSnapshot.docs.map(doc => doc.data());
  };

  const refreshUserItems = async () => {
      const items = await getUserItems();
      setUserItems(items);
  };

  return {
    userItems,
    refreshUserItems,
  };
}
