import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { StackActions } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import {
  Input,
  Button,
  CheckIcon,
  IconButton,
  Text,
  Select,
  Avatar,
  TextArea,
  Stack,
  Icon,
  Divider,
  ScrollView,
  Flex
} from 'native-base';
import { MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { uploadImage } from '../libs/utils';
import useUserUid from '../hooks/useUserUid';
import { getUserRef } from '../libs/usersFirestore';
import Loader from '../components/Loader';
import useUserData from '../hooks/useUserData';
import { ProfileModel } from '../models/profileModel';

const StyledText = (props: any) => {
  const { children, ...other } = props;

  return <Text fontSize="sm" paddingTop={4} color='muted.500' {...other}>
    {children}
  </Text>
}

const EditProfileScreen = ({ navigation }: any) => {
  const userUid = useUserUid();
  const userData = useUserData();
  const userAccount = userData && userData.userAccount;
  const [avatar, setAvatar] = React.useState('');
  const [email, setEmail] = React.useState(userAccount && userAccount.aboutMe || '');
  const [userDescription, setUserDescription] = React.useState(userAccount && userAccount.aboutMe || '');
  const [gender, setGender] = React.useState(userAccount && userAccount.gender || '');
  const [loading, setLoading] = React.useState(false);

  console.log(userData, 'user')
  console.log(userAccount, 'userAccount')

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
    const userAccount = userData && userData.userAccount;
    setUserDescription(userAccount && userAccount.aboutMe)
    setGender(userAccount && userAccount.gender)
    setAvatar(userAccount && userAccount.avatar)
    setEmail(userData && userData.email)
    // TODO: Add location and email
  }, [userData])

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result)
    const resultUri = result.uri;
    if (!result.cancelled) {
      setAvatar(resultUri);
    }
  };

  const handleEditProfile = async () => {
    try {
      setLoading(true);
      const uploadedAvatarUrl = uploadImage(avatar);

      await getUserRef(userUid).update({
        ...userData,
        userAccount: {
          // avatar: uploadedAvatarUrl,
          aboutMe: userDescription,
          gender: gender,
          // email: email,
        }
      });
      const popAction = StackActions.pop(1);

      navigation.dispatch(popAction);
    } catch (e) {
      setLoading(false);
      console.log(e);
      alert('Something went wrong. Please try again');
    }
  };

  const renderGenderField = () => {
    return <>
      <StyledText >
        Gender
      </StyledText>
      <Select
        selectedValue={gender}
        accessibilityLabel="Choose gender"
        placeholder="Choose gender"
        fontSize='md'
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
    </>
  }

  return (
    <React.Fragment>
      <Loader isLoading={loading} />
      <ScrollView style={styles.container}>
        <Stack space={2} mx="4" my='4'>
          <Flex
            direction="row"
            alignItems='center'
            justifyContent='space-between'
          >

            <Flex flex='1'>
              <Avatar
                alignSelf="center"
                size="xl"
                source={{
                  uri: avatar,
                }}
              >
                <IconButton
                  variant='ghost'
                  onPress={handlePickImage}
                  _icon={{
                    as: AntDesign,
                    name: "edit",
                  }}
                />
              </Avatar>
            </Flex>
            <Flex
              direction="column" flex='2'>
              <Text bold fontSize='lg'>
                {userData && userData.name}
              </Text>
              <Text fontSize="sm" paddingTop='2' color='muted.400'>
                *Your username is unique and can't be changed.
              </Text>
            </Flex>
          </Flex>
          <StyledText >
            Email
          </StyledText>
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

          <StyledText >
            About me
          </StyledText>
          <TextArea
            h={20}
            fontSize="md"
            variant="underlined"
            onChangeText={setUserDescription}
            value={userDescription}
          />

          {renderGenderField()}

          <StyledText >
            Location
          </StyledText>
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

          <Button onPress={handleEditProfile} marginTop={4} accessibilityLabel="Save">
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
    backgroundColor: '#FFF',
    height: '100%',
  },
});

export default EditProfileScreen;
