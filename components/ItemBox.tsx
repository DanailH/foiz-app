import React from "react";
import { StyleSheet, Image } from "react-native";
import { Text, IconButton, Flex } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { View } from "../components/Themed";

const FavouriteItemButton = ({ handleIsChecked, isChecked }: any) => (
  <IconButton
    onPress={() => handleIsChecked(!isChecked)}
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

export default function ItemBox({ item }: any) {
  const [isChecked, setIsChecked] = React.useState(true);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        margin: 10,
      }}
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
    </View>
  );
}

const styles = StyleSheet.create({
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
