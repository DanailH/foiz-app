import * as React from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { Context as AuthContext } from '../contexts/AuthContext';

export default function ProfileScreen() {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <Button
        onPress={() => signOut()}
        title="Sign Out"
        accessibilityLabel="Sign Out"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
