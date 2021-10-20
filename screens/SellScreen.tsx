import * as React from 'react';
import {
  Platform,
  StyleSheet,
  SafeAreaView,
  FlatList
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import {
  Button,
  Image,
  TextArea,
  Input,
  Text,
  Stack,
  Icon,
  Box,
  ScrollView
} from "native-base";
import { EvilIcons } from '@expo/vector-icons';
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
      <ScrollView>
        <Stack space={4}>
          <FlatList
            data={images}
            numColumns={4}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }: any) => (
              <Box p={2}>

                <Image
                  source={{ uri: item }}
                  size='md'
                  alt='item-image'
                />
              </Box>
            )}
            ListFooterComponent={
              <>
                <Box style={styles.selectBtn} paddingTop={!images.length ? '4' : '2'}>
                  <Button onPress={handlePickImage} variant="outline" w="50%"
                    leftIcon={<Icon as={EvilIcons} name="plus" />}
                  >
                    {!images.length ? 'Select images' : 'Change images'}
                  </Button>
                </Box>
                <Box style={styles.box}>
                  <Text fontSize="md">
                    Title
                  </Text>
                  <Input size="md" placeholder="e.g. Red Zara blazer" variant="underlined" value={itemTitle} onChangeText={setItemTitle} />

                  <Text fontSize="md" my={4} paddingTop={2}>
                    Describe your item
                  </Text>
                  <TextArea
                    h={20}
                    fontSize="sm"
                    onChangeText={setItemDescription}
                    value={itemDescription}
                    placeholder="e.g. It's worn a few times, true to size"
                  />
                </Box>
                <Box style={styles.box}>
                  <Text fontSize="md">
                    Brand
                  </Text>
                  <Input size="md" placeholder="Add the brand of the item" value={itemBrand} onChangeText={setItemBrand} variant="underlined" />

                  <Text fontSize="md" paddingTop={6}>
                    Select condition
                  </Text>
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

                  <Text fontSize="md">
                    Price
                  </Text>
                  <Input size="md" placeholder="0.00" value={itemPrice} onChangeText={setItemPrice} keyboardType="numeric" type="number" variant="underlined" />
                </Box>
                {loading && <Text style={styles.title}>LOADING...</Text>}
                <Button
                  disabled={!images.length}
                  onPress={handleUploadItem}
                  mx={4}
                  marginBottom={10}
                  marginTop={4}
                >
                  Upload item
                </Button>
              </>
            }
          />
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf7f3",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectBtn: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: 20,
  },
  box: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#FFF',
  },
});
