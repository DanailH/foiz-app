import React from "react"
import {
  Actionsheet,
  Icon,
  Divider
} from "native-base";
import { Feather } from '@expo/vector-icons';
import ProfileScreenContext from "../contexts/ProfileScreenContext";
import { Context as AuthContext } from '../contexts/AuthContext';
import { navigate } from '../navigation/navigationRef';

export default function ProfileSheet() {
  const { isOpen, onClose } = React.useContext(ProfileScreenContext);
  const { logOut } = React.useContext(AuthContext);
  const handleSettingsOnPress = () => { navigate('EditProfileScreen'), onClose() };

  return (
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={handleSettingsOnPress}
            startIcon={
              <Icon
                as={Feather}
                name="settings"
                mr="1"
                size="6"
              />
            }>
            Settings
          </Actionsheet.Item>
          <Divider />
          <Actionsheet.Item
            startIcon={
              <Icon
                as={Feather}
                name="share-2"
                mr="1"
                size="6"
              />
            }>Share</Actionsheet.Item>
          <Divider />
          <Actionsheet.Item
            onPress={() => logOut()}
            accessibilityLabel="Log out"
            startIcon={
              <Icon
                as={Feather}
                name="log-out"
                mr="1"
                size="6"
              />
            }
          >
            Log out
          </Actionsheet.Item>
          <Divider />
          {/* <Actionsheet.Item onPress={onClose}>Cancel</Actionsheet.Item> */}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  )
}