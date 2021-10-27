import * as React from 'react';
import { getItemRef, getItemsCollectionRef } from '../libs/itemsFirestore';
import useUserData from './useUserData';

export default function useUserItems() {
  const userData = useUserData();
  const [userItems, setUserItems] = React.useState<any>([]);

  React.useEffect(() => {
    (async () => {
      if (userData && userData.items) {
        const items: any = await getItemsCollectionRef().where('uid', 'in', userData.items).get();

        setUserItems(items.data());
      }
    })()
  }, [userData]);

  return userItems;
}
