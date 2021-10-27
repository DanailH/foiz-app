import React from "react"
import {
  Actionsheet,
  Icon,
  Divider
} from "native-base";
import { Feather } from '@expo/vector-icons';
import ProfileScreenContext from "../contexts/ProfileScreenContext";
import { navigate } from '../navigation/navigationRef';

export default function ProfileSheet() {
  const { isOpen, onClose } = React.useContext(ProfileScreenContext);
  const handleSettingsOnPress = () => { navigate('EditProfileScreen'), onClose()};

  return (
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={ handleSettingsOnPress}
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
          <Actionsheet.Item>Share</Actionsheet.Item>
          <Divider />
          <Actionsheet.Item onPress={onClose}>Cancel</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  )
}