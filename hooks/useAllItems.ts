import * as React from 'react';
import { firestore } from '../libs/firebase';
import { getItemsCollectionRef } from '../libs/itemsFirestore';

export default function useUserData() {
  const [allItems, setAllItems] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    refreshItems();
  }, [firestore]);

  const getAllItems = async () => {
    try {
      setLoading(true);
      const itemsSnapshot = await getItemsCollectionRef().orderBy('timestamp', 'desc').get();
      setLoading(false);
      return itemsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const refreshItems = async () => {
    const items = await getAllItems();
    setAllItems(items);
  };

  return {
    loading,
    allItems,
    refreshItems
  };
}
