import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const AuthStack = createStackNavigator();

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="SignInScreen">
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerTitle: "Sign In" }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerTitle: "Sign Up" }}
      />
    </AuthStack.Navigator>
  );
}