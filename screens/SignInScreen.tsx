import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Input,
  Button,
  Heading,
  Text,
  Center,
  Divider,
  Stack,
  Icon,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Context as AuthContext } from '../contexts/AuthContext';
import { navigate } from '../navigation/navigationRef';
import Loader from '../components/Loader';

const SignInScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { signIn } = React.useContext(AuthContext);

  const handleEmailOnChange = (value: string) => setEmail(value);
  const handlePasswordOnChange = (value: string) => setPassword(value);
  const handleSignInOnPress = () => { setLoading(true), signIn({ email, password })};
  const handleNavigateOnPress = () => navigate('SignUp');

  return (
    <React.Fragment>
      <Loader isLoading={loading} />
      <View style={styles.container}>
        <Center>
          <Stack space={4}>
            <Heading size="lg">Welcome to Foiz</Heading>
            <Text fontSize="sm">
              Your place to sell and find preloved clothes, shoes and accessories
            </Text>
          </Stack>
        </Center>
        <Divider my="8" />
        <Stack space={6} mx="4">
          <Heading size="md">I already have an account</Heading>
          <Input
            style={styles.input}
            placeholder="Email"
            size="lg"
            onChangeText={handleEmailOnChange}
            value={email}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="email" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
          />
          <Input
            style={styles.input}
            placeholder="Password"
            size="lg"
            onChangeText={handlePasswordOnChange}
            value={password}
            secureTextEntry={true}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="lock" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            InputRightElement={
              <Icon
                as={<MaterialIcons name="visibility-off" />}
                size={5}
                mr="2"
                color="muted.400"
              />
            }
          />
          <Text fontSize="xs">
            Forgot password
          </Text>

          <Button onPress={handleSignInOnPress} accessibilityLabel="Login">
            Login
          </Button>
        </Stack>
        <Divider my="8" />

        <Stack space={6} style={styles.loginContainer}>
          <Heading size="md">Are you new to Foiz?</Heading>
          <Text fontSize="sm">
            Register for free to become a member and start selling/buying preloved
            fashion items. With the information you enter below you can log in to
            our app.
          </Text>
          <Button
            onPress={handleNavigateOnPress}
            accessibilityLabel="Sign Up"
            variant="outline"
          >
            Sign Up
          </Button>
        </Stack>
      </View>
    </React.Fragment>
  );
};

SignInScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    height: '100%',
  },
  loginContainer: {
    backgroundColor: '#faf7f3',
    padding: 10,
  },
  input: {
    backgroundColor: '#FFF',
  },
});

export default SignInScreen;
