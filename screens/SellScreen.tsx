import * as React from 'react';
import { Button, Image, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import { Text, View } from '../components/Themed';
import { uploadImage } from '../libs/utils';
import useUserUid from '../hooks/useUserUid';
import { getItemRef } from '../libs/itemsFirestore';
import useUserData from '../hooks/useUserData';
import { getUserRef } from '../libs/usersFirestore';

export default function SellScreen() {
  const userUid = useUserUid();
  const itemUid = uuid();
  const userData = useUserData();
  const [loading, setLoading] = React.useState(false);
  const [images, setImages] = React.useState<string[]>([]);

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImages([...images, result.uri]);
    }
  };

  const handleUploadImages = async () => {
    try {
      setLoading(true);
      const uploadImagesPromiseArray: any = [];
      images.forEach((image) => {
        uploadImagesPromiseArray.push(uploadImage(image));
      });

      const uploadUrls = await Promise.all(uploadImagesPromiseArray);
      getItemRef(itemUid).set({
        images: uploadUrls,
      });

      if (userData) {
        getUserRef(userUid).update({
          items: [...userData.items, itemUid],
        });
      } else {
        getUserRef(userUid).set({
          items: [itemUid],
        });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      setLoading(false);
      setImages([]);
    }
  };

  const renderPickedImages = () => {
    const mappedImages = images.map((image, index) => <Image key={index} source={{ uri: image }} style={{ width: 200, height: 200 }} />);
    return (
      !!images.length && (
        <React.Fragment>
          { mappedImages }
          <Button title="Upload images" onPress={handleUploadImages} />
        </React.Fragment>
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sell</Text>

      {loading && <Text style={styles.title}>LOADING...</Text>}

      <Button title="Pick an image" onPress={handlePickImage} />
      { renderPickedImages() }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
