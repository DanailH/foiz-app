import * as React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Image, Button } from "react-native";
import { Text, View } from '../components/Themed';
import useAllItems from '../hooks/useAllItems';

export default function HomeScreen() {
  const { allItems, refreshItems } = useAllItems();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Button title="Refresh" onPress={refreshItems} />
        }
        data={allItems}
        renderItem={({ item }: any) => (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              margin: 10,
            }}
          >
            <Image
              style={styles.imageThumbnail}
              source={{ uri: item.images[0] }}
            />
            <Text>{item.title}</Text>
            <Text>{item.brand}</Text>
            <Text>{item.price}</Text>
          </View>
        )}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
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
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
  },
});
