import React from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import { Context as AuthContext } from '../contexts/AuthContext';
import { navigate } from '../navigation/navigationRef';

const SignInScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { signIn } = React.useContext(AuthContext);

  const handleEmailOnChange = (value: string) => setEmail(value);
  const handlePasswordOnChange = (value: string) => setPassword(value);
  const handleSignInOnPress = () => signIn({email, password});
  const handleNavigateOnPress = () => navigate('SignUp');

  return (
    <View style={styles.container}>
      <Text>Sign In</Text>

      <TextInput
        style={styles.input}
        onChangeText={handleEmailOnChange}
        value={email}
        placeholder="Email"
        autoCompleteType="off"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        onChangeText={handlePasswordOnChange}
        value={password}
        placeholder="Password"
        autoCompleteType="off"
        autoCapitalize="none"
        secureTextEntry={true}
      />

      <Button
        onPress={handleSignInOnPress}
        title="Sign In"
        accessibilityLabel="Sign In"
      />

      <Button
        onPress={handleNavigateOnPress}
        title="Sign Up"
        accessibilityLabel="Sign Up"
      />
    </View>
  );
};

SignInScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export default SignInScreen;
