import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  Avatar,
  Text,
  Button,
  Input,
  Icon,
  Box
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from '../components/Themed';
import { Context as AuthContext } from '../contexts/AuthContext';
import useUserData from '../hooks/useUserData';

export default function ProfileScreen() {
  const userData = useUserData();

  console.log(userData, 'user')
  const { logOut } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Avatar
        alignSelf="center"
        size="xl">
      </Avatar>
      <Text fontSize="md" textAlign='center' py='4'>
        Username
      </Text>
      <Box style={styles.boxContainer} p='4'>
      <Input
        // style={styles.input}
        placeholder="Email"
        size="lg"
        // onChangeText={handleEmailOnChange}
        // value={email}
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
        // style={styles.input}
        placeholder="Country"
        size="lg"
        // onChangeText={handleEmailOnChange}
        // value={email}
        marginTop ='4'
        InputLeftElement={
          <Icon
            as={<MaterialIcons name="email" />}
            size={5}
            ml="2"
            color="muted.400"
          />
        }
      />
      </Box>
      <Button
        onPress={() => logOut()}
        accessibilityLabel="Log out" 
        variant="ghost"
      >
        Log out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf7f3",
    // padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  boxContainer: {
    backgroundColor: "#fff",
  }
});
