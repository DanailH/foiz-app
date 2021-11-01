import * as React from 'react';
import { FlatList, StyleSheet, ScrollView } from 'react-native';
import {
  Avatar,
  Text,
  HStack,
  Flex,
  Stack,
  Heading,
  Divider
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import useUserData from '../hooks/useUserData';
import useUserItems from '../hooks/useUserItems';
import ProfileSheet from '../components/ProfileSheet';
import ItemBox from '../components/ItemBox';
import { roundArrayItems } from '../libs/utils';

export default function ProfileScreen() {
  const isFocused = useIsFocused();
  const { userData, refreshUserData } = useUserData();
  const { userItems, refreshUserItems } = useUserItems();

  React.useEffect(() => {
    if (isFocused) {
      refreshUserData();
      refreshUserItems();
    }
    
  }, [isFocused]);

  const renderAvatarHeader = () => {
    return <Flex
      direction="row"
      alignItems='center'
      justifyContent='space-between'
      paddingBottom='4'
    >

      <Flex flex='1'>
        <Avatar
          alignSelf="center"
          size="xl"
          source={{
            uri: userData?.userAccount?.avatar,
          }}
        >
        </Avatar>
      </Flex>
      <Flex
        direction="column" flex='2' alignItems='center'>
        <Text bold fontSize='lg'>
          {userData && userData.name}
        </Text>
      </Flex>
    </Flex>
  }

  const itemsCount = userData?.items?.length
  
  const renderItems = () => {
    return (
      <FlatList
        ListHeaderComponent={<Heading size="sm" paddingBottom="4">{itemsCount} items</Heading>}
        data={roundArrayItems(userItems)}
        renderItem={({ item, index }: any) => <ItemBox index={index} item={item} />}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
  return (
    <ScrollView style={styles.container}>
      {renderAvatarHeader()}
      <Stack space={2} >
        <Divider my='2' />
        <HStack>
          <Feather name="map-pin" size={20} style={styles.icon} />
          <Text marginLeft='2' fontSize="md">Burgas, Bulgaria</Text>
        </HStack>

        <Text fontSize="md">
          {userData?.userAccount?.aboutMe}
        </Text>
      </Stack>
      {userItems && <>
        <Divider my='4' />
        {renderItems()}
      </>
      }
      <ProfileSheet />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    color: '#737373'
  }
});
