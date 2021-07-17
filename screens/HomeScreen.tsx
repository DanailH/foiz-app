import * as React from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { Context as AuthContext } from '../contexts/AuthContext';

export default function HomeScreen() {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
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
