import * as React from 'react';
import { getUserRef } from '../libs/usersFirestore';
import useUserUid from './useUserUid';

export default function useUserData() {
  const userUid = useUserUid();
  const [userData, setUserData] = React.useState<any>(null);

  React.useEffect(() => {
    (async () => {
      const user = await getUserRef(userUid).get();

      if (user.data()) {
        setUserData(user.data());
      }
    })();
  }, [userUid]);

  return userData;
}
