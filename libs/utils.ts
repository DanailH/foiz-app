import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import { storage } from '../libs/firebase';

export const uploadImage = async (uri: string) => {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob: any = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = storage.ref().child(uuid());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
};

export const roundArrayItems = (array: any) => {
  return array.length % 2 === 0 ? array : [...array, {}];
}