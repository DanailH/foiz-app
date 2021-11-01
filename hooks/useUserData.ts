import * as React from 'react';
import { getUserRef } from '../libs/usersFirestore';
import useUserUid from './useUserUid';

export default function useUserData() {
  const userUid = useUserUid();
  const [userData, setUserData] = React.useState<any>(null);

  React.useEffect(() => {
    refreshUserData();
  }, [userUid]);

  const getUserData = async () => {
    const user = await getUserRef(userUid).get();
    return user.data();
  };

  const refreshUserData = async () => {
    const data = await getUserData();
    setUserData(data);
  };

  return {
    userData,
    refreshUserData
  };
}
