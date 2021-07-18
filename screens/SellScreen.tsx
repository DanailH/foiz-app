import * as React from 'react';
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import { Text } from '../components/Themed';
import { uploadImage } from '../libs/utils';
import useUserUid from '../hooks/useUserUid';
import { getItemRef } from '../libs/itemsFirestore';
import useUserData from '../hooks/useUserData';
import { getUserRef } from '../libs/usersFirestore';
import { Picker } from '@react-native-picker/picker';
import { Item } from '../models/itemModel';
import firebase from '../libs/firebase';

export default function SellScreen() {
  const userUid = useUserUid();
  const itemUid = uuid();
  const userData = useUserData();
  const [loading, setLoading] = React.useState(false);
  const [images, setImages] = React.useState<string[]>([]);
  const [itemTitle, setItemTitle] = React.useState<string>('');
  const [itemDescription, setItemDescription] = React.useState<string>('');
  const [itemBrand, setItemBrand] = React.useState<string>('');
  const [itemPrice, setItemPrice] = React.useState<string>('');
  const [itemCondition, setItemCondition] = React.useState<string>('');
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

  const handleUploadItem = async () => {
    try {
      setLoading(true);
      const uploadImagesPromiseArray: any = [];
      images.forEach((image) => {
        uploadImagesPromiseArray.push(uploadImage(image));
      });

      const uploadUrls: string[] = await Promise.all(uploadImagesPromiseArray);
      const item: Item = {
        images: uploadUrls,
        title: itemTitle,
        description: itemDescription,
        brand: itemBrand,
        condition: itemCondition,
        price: itemPrice,
        user: userUid!,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };

      getItemRef(itemUid).set(item);

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
      setItemTitle('');
      setItemDescription('');
      setItemBrand('');
      setItemPrice('');
      setItemCondition('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Button title="Pick an image" onPress={handlePickImage} />
        }
        data={images}
        renderItem={({ item }: any) => (
          <Image
            source={{ uri: item }}
            style={{ width: 100, height: 100, margin: 3 }}
          />
        )}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={
          <React.Fragment>
            <TextInput
              style={styles.input}
              onChangeText={setItemTitle}
              placeholder="Title"
              value={itemTitle}
            />

            <TextInput
              style={{
                ...styles.input,
                height: 200,
              }}
              onChangeText={setItemDescription}
              placeholder="Description"
              value={itemDescription}
              multiline
              textAlignVertical="top"
            />

            <TextInput
              style={styles.input}
              onChangeText={setItemBrand}
              placeholder="Brand"
              value={itemBrand}
            />

            <Text>Condition</Text>
            <Picker
              selectedValue={itemCondition}
              onValueChange={(value) => setItemCondition(value)}
            >
              <Picker.Item label="New with tags" value="new with tags" />
              <Picker.Item label="New without tags" value="new without tags" />
              <Picker.Item label="Very good" value="very good" />
              <Picker.Item label="Good" value="good" />
              <Picker.Item label="Satisfactory" value="satisfactory" />
            </Picker>

            <TextInput
              style={styles.input}
              onChangeText={setItemPrice}
              placeholder="Price"
              value={itemPrice}
              keyboardType="numeric"
            />

            {loading && <Text style={styles.title}>LOADING...</Text>}
            <Button
              disabled={!images.length}
              title="Upload item"
              onPress={handleUploadItem}
            />
          </React.Fragment>
        }
      />
    </SafeAreaView>
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
  input: {
    marginBottom: 20,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
