import * as React from 'react';
import { auth } from '../libs/firebase';

export default function useUserUid() {
  const [userUid, setUserUid] = React.useState<undefined | string>(undefined);

  React.useEffect(() => {
    setUserUid(auth.currentUser?.uid);
  }, [auth]);

  return userUid;
}
