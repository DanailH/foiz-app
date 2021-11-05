import * as React from 'react';
import { StyleSheet, ScrollView, View, Share } from 'react-native';
import { Text, Flex, Button, Divider, Icon } from "native-base";
import { AntDesign, Feather } from "@expo/vector-icons";
import { StackScreenProps } from '@react-navigation/stack';
import { getItemRef } from '../libs/itemsFirestore';
import { HomeParamList } from '../models/navigationParams';
import ImageCarousel from '../components/ImageCarousel';
import ItemActionSheet from '../components/ItemActionSheet';
import DeleteModal from '../components/DeleteModal';

export default function ItemDetailsScreen({
  route,
}: StackScreenProps<HomeParamList, 'ItemDetailsScreen'>) {

  const { itemId }: any = route.params;
  const [item, setItem] = React.useState<any>(null);

  React.useEffect(() => {
    (async () => {
      const item = await getItemRef(itemId).get();
      if (item) {
        setItem(item.data());
      }
    })();
  }, [itemId]);

  const onShare = () => {
    let link = "";
    let message = "Hey come join me in Foiz + url to site/store";

    Share.share({
      message,
      url: link,
      title: "Join me"
    })
  }

  return (
    <View style={styles.container}>
      <DeleteModal/>
      <ScrollView>
        <ImageCarousel item={item} />
        <View style={{ padding: 10 }}>
          <Text bold fontSize='lg'>{item?.title}</Text>
          <Flex direction='row' alignItems='center'>
            <Text style={{ color: '#635f5c' }}>{item?.condition}</Text>
            <Button
              size="sm"
              variant="ghost"
            // onPress={() => console.log('hello world')}
            >
              {item?.brand}
            </Button>
          </Flex>
          <Text bold fontSize="md">
            {item?.price}
          </Text>
          <Button
            size="sm"
            marginY={6}
            _text={{
              fontSize: 'md',
            }}
          //  onPress={() => console.log('hello world')}
          >
            Contact seller
          </Button>
          <Divider marginBottom={2} />
          <Flex direction='row' alignItems='center' justifyContent="space-around">
            <Button
              size="sm"
              variant="ghost"
              flex={1}
              _text={{
                fontSize: 'sm',
                color: "#635f5c",
              }}
              leftIcon={<Icon as={AntDesign} size="sm" name="hearto" />}
            // onPress={() => console.log('hello world')}
            >
              Add to favorites
            </Button>
            <Button
              size="sm"
              variant="ghost"
              flex={1}
              _text={{
                fontSize: 'sm',
                color: "#635f5c",
              }}
              leftIcon={<Icon as={Feather} size="sm" name="share" />}
              onPress={() => onShare()}
            >
              Share
            </Button>
          </Flex>
          <Divider marginBottom={4} marginTop={2} />
          <Text fontSize="sm" paddingBottom={2} style={{ color: '#635f5c' }}>
            Product description
          </Text>
          <Text fontSize="md">
            {item?.description}
          </Text>
          <Divider marginY={4} />
        </View>
        <ItemActionSheet />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 10,
  },
});
