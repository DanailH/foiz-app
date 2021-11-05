import React from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { Text, IconButton, Flex } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { navigate } from '../navigation/navigationRef';

const FavouriteItemButton = ({ handleIsChecked, isChecked }: any) => (
  <IconButton
    onPress={() => handleIsChecked(!isChecked)}
    style={{ paddingRight: 0 }}
    _icon={{
      as: AntDesign,
      name: isChecked ? "hearto" : "heart",
      color: isChecked ? "#bbbbbb" : "#f03e53",
      size: "sm",
    }}
    _pressed={{
      bg: "#fff",
    }}
  />
);

export default function ItemBox({ item, index }: any) {
  const [isChecked, setIsChecked] = React.useState(true);
  const handleItemDetailsOnPress = () => navigate('ItemDetailsScreen', { itemId: item.id });
  const isItemEven = (index + 1) % 2 == 0
  
  if (!item.price) {
    return (
      <View
        style={isItemEven ? styles.imageWrapper : styles.evenImageWrapper}
      />
    );
  }
  return (
    <TouchableOpacity
      style={isItemEven ? styles.imageWrapper : styles.evenImageWrapper}
      onPress={handleItemDetailsOnPress}
    >
      <Image style={styles.imageThumbnail} source={{ uri: item.images[0] }} />
      <Flex direction="row" style={styles.boxContainer}>
        <Text bold fontSize="md">
          {item.price}
        </Text>
        <FavouriteItemButton
          isChecked={isChecked}
          handleIsChecked={setIsChecked}
        />
      </Flex>
      <Text>{item.brand} M</Text>
      <Text></Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 15,
  },
  evenImageWrapper: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 15
  },
  boxContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 250,
  },
});
