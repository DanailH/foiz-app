import React from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import { Context as AuthContext } from '../contexts/AuthContext';

const SignUpScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { signUp } = React.useContext(AuthContext);

  const handleEmailOnChange = (value: string) => setEmail(value);
  const handlePasswordOnChange = (value: string) => setPassword(value);
  const handleSignUpOnPress = () => signUp({ email, password });

  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>

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
        onPress={handleSignUpOnPress}
        title="Sign Up"
        accessibilityLabel="Sign Up"
      />
    </View>
  );
};

SignUpScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {},
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export default SignUpScreen;
