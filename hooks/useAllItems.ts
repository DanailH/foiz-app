import * as React from 'react';
import { firestore } from '../libs/firebase';
import { getItemsCollectionRef } from '../libs/itemsFirestore';

export default function useUserData() {
  const [allItems, setAllItems] = React.useState<any>(null);

  const getAllItems = async () => {
    const itemsSnapshot = await getItemsCollectionRef().orderBy('timestamp', 'desc').get();
    return itemsSnapshot.docs.map(doc => doc.data());
  };

  const refreshItems = async () => {
    const items = await getAllItems();
    setAllItems(items);
  };

  React.useEffect(() => {
    refreshItems();
  }, [firestore]);

  return {
    allItems,
    refreshItems
  };
}
