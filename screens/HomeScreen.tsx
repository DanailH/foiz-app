import * as React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { FlatList, View, StyleSheet } from 'react-native';
import {
  Input,
  Heading,
  Text,
  Box,
  Flex,
  Icon,
  Button,
  ScrollView
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import useAllItems from '../hooks/useAllItems';
import ItemBox from '../components/ItemBox';
import { roundArrayItems } from '../libs/utils';
import Loader from '../components/Loader';

const SearchBar = () => (
  <Input
    placeholder="Search for items"
    variant="filled"
    bg="gray.100"
    borderRadius="10"
    py="2"
    m="4"
    fontSize="14"
    placeholderTextColor="gray.600"
    _hover={{ bg: "gray.200", borderWidth: 0 }}
    borderWidth="0"
    InputLeftElement={
      <Icon
        ml="2"
        size="5"
        color="gray.500"
        as={<Ionicons name="ios-search" />}
      />
    }
  />
);

export default function HomeScreen() {
  const isFocused = useIsFocused();
  const { loading, allItems, refreshItems } = useAllItems();
  
  React.useEffect(() => {
    if (isFocused) {
      refreshItems();
    }
  }, [isFocused]);

  return (
    <View style={styles.container} >
      <Loader isLoading={loading} />
      <SearchBar />
      <ScrollView>
      <Box m="4">
        <Heading size="md">Shop by category</Heading>
        <Text fontSize="sm">
          Your place to sell and find preloved clothes, shoes and accessories
        </Text>
      </Box>
      <FlatList
        ListHeaderComponent={
          <Flex direction="row" style={styles.boxContainer}>
            <Heading size="md" p="4">
              Newsfeed
            </Heading>
            <Button
              variant="ghost"
              onPress={refreshItems}
              _text={{
                fontSize: "sm",
              }}
            >
              Refresh feed
            </Button>
          </Flex>
        }
        data={roundArrayItems(allItems)}
        renderItem={({ item, index }: any) => <ItemBox index={index} item={item} />}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  boxContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 20
  },
});
