import React from 'react';
import { StyleSheet, Platform, } from 'react-native';
import { StackActions } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import {
  Input,
  Button,
  CheckIcon,
  IconButton,
  Text,
  Select,
  TextArea,
  Stack,
  Icon,
  Divider,
  ScrollView,
  Flex,
  Image
} from 'native-base';
import { MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { uploadImage } from '../libs/utils';
import useUserUid from '../hooks/useUserUid';
import { getUserRef } from '../libs/usersFirestore';
import Loader from '../components/Loader';
import useUserData from '../hooks/useUserData';
import { storage } from '../libs/firebase';

export const StyledText = (props: any) => {
  const { children, ...other } = props;

  return (
    <Text fontSize="sm" paddingTop={4} color="muted.500" {...other}>
      {children}
    </Text>
  );
}

const EditProfileScreen = ({ navigation }: any) => {
  const userUid = useUserUid();
  const { userData } = useUserData();
  const [avatar, setAvatar] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  React.useEffect(() => {
    const userAccount = userData?.userAccount;
    if (userAccount) {
      setUserDescription(userAccount.aboutMe);
      setGender(userAccount.gender);
      setAvatar(userAccount.avatar);
    }
    setEmail(userData?.email);
  }, [userData]);

  const handlePickImage = async () => {
    setLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setLoading(false);
      setAvatar(result.uri);
    }
  };

  const handleEditProfile = async () => {
    try {
      setLoading(true);
      let uploadedAvatarUrl = avatar;
      if (avatar) {
        uploadedAvatarUrl = await uploadImage(avatar);
      }

      if (userData?.userAccount) {
        await getUserRef(userUid).update({
          ...userData,
          userAccount: {
            ...userData.userAccount,
            avatar: uploadedAvatarUrl,
            aboutMe: userDescription,
            gender: gender,
            // email: email,
          },
        });
      } else {
        await getUserRef(userUid).set({
          ...userData,
          userAccount: {
            avatar: uploadedAvatarUrl,
            aboutMe: userDescription,
            gender: gender,
            // email: email,
          },
        });
      }

      if (userData.userAccount?.avatar) {
        let oldAvatarRef = storage.refFromURL(userData.userAccount.avatar);
        await oldAvatarRef.delete();
      }

      const popAction = StackActions.pop(1);
      navigation.dispatch(popAction);
    } catch (e) {
      setLoading(false);
      console.log(e);
      alert('Something went wrong. Please try again');
    }
  };

  const GenderField = () => {
    return (
      <React.Fragment>
        <StyledText>Gender</StyledText>
        <Select
          selectedValue={gender}
          accessibilityLabel="Choose gender"
          placeholder="Choose gender"
          fontSize="md"
          variant="underlined"
          _selectedItem={{
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Select.Item label="Woman" value="woman" />
          <Divider />
          <Select.Item label="Man" value="man" />
          <Divider />
          <Select.Item label="Other" value="other" />
        </Select>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Loader isLoading={loading} />
      <ScrollView style={styles.container}>
        <Stack space={2} mx="4" my="4">
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            px={4}
          >
            <Flex 
            flex="1" 
            style={styles.avatar}
            >
              <Image
                source={{
                  uri: avatar,
                }}
              />
                <IconButton
                  variant="ghost"
                  onPress={handlePickImage}
                  style={styles.icon}
                  _icon={{
                    as: AntDesign,
                    name: "edit",
                  }}
                />
            </Flex>
            <Flex direction="column" flex="2">
              <Text bold fontSize="lg">
                {userData && userData.name}
              </Text>
              <Text fontSize="sm" paddingTop="2" color="muted.400">
                *Your username is unique and can't be changed.
              </Text>
            </Flex>
          </Flex>
          <StyledText>Email</StyledText>
          <Input
            placeholder="Email"
            size="lg"
            variant="underlined"
            // onChangeText={handleEmailOnChange}
            value={email}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="email" />}
                size={5}
                ml="2"
                color="muted.600"
              />
            }
          />

          <StyledText>About me</StyledText>
          <TextArea
            h={20}
            fontSize="md"
            variant="underlined"
            onChangeText={setUserDescription}
            value={userDescription}
          />

          <GenderField />

          <StyledText>Location</StyledText>
          <Input
            placeholder="Location"
            size="lg"
            variant="underlined"
            // onChangeText={handleEmailOnChange}
            // value={email}
            InputLeftElement={
              <Icon
                as={<Entypo name="location-pin" />}
                size={5}
                ml="2"
                color="muted.600"
              />
            }
          />

          <Button
            onPress={handleEditProfile}
            marginTop={4}
            accessibilityLabel="Save"
          >
            Save
          </Button>
        </Stack>
      </ScrollView>
    </React.Fragment>
  );
};

EditProfileScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: "100%",
  },
  avatar: {
    borderRadius: 100,
    width: 100,
    height: 100,
    marginRight: 10,
    backgroundColor: '#faf7f3',
  },
  icon: {
    backgroundColor: '#faf7f3',
    color: 'black',
    opacity: 0.9,
    borderRadius: 50,
    position: 'absolute',
    right: 28,
    bottom: 25
  }
});

export default EditProfileScreen;
