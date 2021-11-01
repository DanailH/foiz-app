/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { IconButton } from 'native-base';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import SellScreen from '../screens/SellScreen';
import { BottomTabParamList, HomeParamList, SellParamList } from '../models/navigationParams';
import { ProfileNavigator } from './ProfileNavigator';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home-sharp" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Sell"
        component={SellNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-add-circle" color={color} />,
          tabBarVisible: false
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-person" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: 'Home' }}
      />
    </HomeStack.Navigator>
  );
}

const SellStack = createStackNavigator<SellParamList>();

function SellNavigator({ navigation }: any) {
  return (
    <SellStack.Navigator>
      <SellStack.Screen
        name="SellScreen"
        component={SellScreen}
        options={{
          headerTitle: 'Sell item',
          headerLeft: () => (
            <IconButton
              onPress={() => {
                navigation.goBack()
              }}
              title="Close"
              _icon={{
                as: EvilIcons,
                name: "close",
              }}
            />
          ),
        }}
      />
    </SellStack.Navigator>
  );
}
