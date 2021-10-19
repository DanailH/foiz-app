import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Input,
  Button,
  Heading,
  Text,
  Divider,
  Stack,
  Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Context as AuthContext } from "../contexts/AuthContext";

const SignUpScreen = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signUp } = React.useContext(AuthContext);

  const handleNameOnChange = (value: string) => setName(value);
  const handleEmailOnChange = (value: string) => setEmail(value);
  const handlePasswordOnChange = (value: string) => setPassword(value);
  const handleSignUpOnPress = () => signUp({ email, password });

  return (
    <View style={styles.container}>
      <Stack style={styles.box} space={4}>
        <Heading size="md">Are you new to Foiz?</Heading>
        <Text fontSize="sm">
          Register for free to become a member and start selling/buying preloved
          fashion items. With the information you enter below you can log in to
          our app.
        </Text>
        <Divider my="4" />
        <Input
          style={styles.input}
          placeholder="Name"
          size="lg"
          onChangeText={handleNameOnChange}
          value={name}
        />
        <Input
          style={styles.input}
          placeholder="Email"
          size="lg"
          onChangeText={handleEmailOnChange}
          value={email}
        />

        <Input
          style={styles.input}
          placeholder="Password"
          size="lg"
          onChangeText={handlePasswordOnChange}
          value={password}
          secureTextEntry={true}
          InputRightElement={
            <Icon
              as={<MaterialIcons name="visibility-off" />}
              size={5}
              mr="2"
              color="muted.400"
            />
          }
        />

        <Button onPress={handleSignUpOnPress} accessibilityLabel="Sign Up">
          Sign Up
        </Button>
      </Stack>
    </View>
  );
};

SignUpScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: "100%",
    padding: 20,
  },
  box: {
    backgroundColor: "#fcf9f9",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: "#FFF",
  },
});

export default SignUpScreen;
