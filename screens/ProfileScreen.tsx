import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {
  Avatar,
  Text,
  Button,
  HStack,
  Flex,
  Stack,
  Heading,
  Divider
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { View } from '../components/Themed';
import { Context as AuthContext } from '../contexts/AuthContext';
import useUserData from '../hooks/useUserData';
import useUserItems from '../hooks/useUserItems';
import ProfileSheet from '../components/ProfileSheet';
import ItemBox from '../components/ItemBox';

export default function ProfileScreen() {
  const userData = useUserData();
  const userItems = useUserItems();
  const userAccount = userData && userData.userAccount
  const { logOut } = React.useContext(AuthContext);

  const renderAvatarHeader = () => {
    return <Flex
      direction="row"
      alignItems='center'
      justifyContent='space-between'
    >

      <Flex flex='1'>
        <Avatar
          alignSelf="center"
          size="xl"
        // source={{
        //   uri: avatar,
        // }}
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

  const renderItems = () => {
    return <FlatList
      ListHeaderComponent={
        <Heading size="md">Newsfeed</Heading>
      }
      data={userItems}
      renderItem={({ item }: any) => <ItemBox item={item} />}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
    />
  }

  return (
    <View style={styles.container}>
      {renderAvatarHeader()}
      <Stack space={2} my='4'>
        <HStack>
          <Feather name="map-pin" size={20} style={styles.icon} />
          <Text marginLeft='2' fontSize="md">Burgas, Bulgaria</Text>
        </HStack>

        <Text fontSize="md">
          {userAccount && userAccount.aboutMe}
        </Text>
        {userItems && <>
          <Divider my='4'/>
          {renderItems()}
        </>
        }
      </Stack>
      <Button
        onPress={() => logOut()}
        accessibilityLabel="Log out"
        variant="ghost"
      >
        Log out
      </Button>

      <ProfileSheet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    color: '#737373'
  }
});
