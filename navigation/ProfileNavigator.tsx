import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton, Icon, useDisclose } from "native-base";
import { Entypo } from '@expo/vector-icons';
import EditProfileScreen from '../screens/EditProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { ProfileParamList } from '../models/navigationParams';
import ProfileScreenContext from '../contexts/ProfileScreenContext';
import { navigate } from '../navigation/navigationRef';

const ProfileStack = createStackNavigator<ProfileParamList>();

const ProfileSheetHeaderRight = () => {
  const { onOpen } = React.useContext(ProfileScreenContext)

  return (
    <IconButton
      onPress={onOpen}
      _pressed={{
        bg: "#fff",
      }}
      icon={<Icon as={<Entypo name='dots-three-horizontal' />}
        size='sm'
      />} />
  )
};

export function ProfileNavigator() {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <ProfileScreenContext.Provider value={{ isOpen, onOpen, onClose }}>
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerTitle: 'Profile',
            headerRight: ProfileSheetHeaderRight
          }}
        />
        <ProfileStack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{ headerTitle: "Edit profile",
            headerLeft: () => (
              <IconButton
                onPress={() => {
                  navigate('ProfileScreen')
                }}
                title="Back"
                _pressed={{
                  bg: "transparent",
                }}
                _icon={{
                  as: Entypo,
                  name: "chevron-small-left",
                }}
              />
            ), }}
        />
      </ProfileStack.Navigator>
    </ProfileScreenContext.Provider>
  );
}

