import React from "react";
import { Share } from 'react-native';
import {
  Actionsheet,
  Divider
} from "native-base";
import ProfileScreenContext from "../contexts/ProfileScreenContext";
import { Context as AuthContext } from '../contexts/AuthContext';
import { navigate } from '../navigation/navigationRef';

export default function ItemActionSheet() {
  const { isOpen, onClose } = React.useContext(ProfileScreenContext);
  const { logOut } = React.useContext(AuthContext);
  const handleSettingsOnPress = () => { navigate('EditProfileScreen'), onClose() };

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
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={handleSettingsOnPress}
            accessibilityLabel="Edit item"
          >
            Edit
          </Actionsheet.Item>
          <Divider />
          <Actionsheet.Item
            accessibilityLabel="Share item"
            onPress={() => onShare()}
          >
            Share
          </Actionsheet.Item>
          <Divider />
          <Actionsheet.Item
            onPress={() => logOut()}
            accessibilityLabel="Delete item"
            _text= {{
              color: '#f03e53'
            }}
          >
            Delete
          </Actionsheet.Item>
          <Divider />
        </Actionsheet.Content>
      </Actionsheet>
    </>
  )
}