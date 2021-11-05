/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Ionicons, EvilIcons, Entypo } from '@expo/vector-icons';
import { Icon, IconButton, useDisclose } from 'native-base';
import HomeScreen from '../screens/HomeScreen';
import SellScreen from '../screens/SellScreen';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';
import { BottomTabParamList, HomeParamList, SellParamList } from '../models/navigationParams';
import { ProfileNavigator } from './ProfileNavigator';
import { theme } from '../constants/BaseTheme';
import ProfileScreenContext from '../contexts/ProfileScreenContext';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
    animationEnabled
      tabBarOptions={{ activeTintColor: theme.colors.primary[400],
        labelStyle: {
          fontSize: 12,
        },
        iconStyle: {
          size: 20
        }
      }}
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

const ProfileSheetHeaderRight = () => {
  const { onOpen } = React.useContext(ProfileScreenContext)

  return (
    <IconButton
      onPress={onOpen}
      _pressed={{
        bg: "#fff",
      }}
      icon={<Icon as={<Entypo name='dots-three-horizontal' />}
        size='sm'
      />} />
  )
};

function HomeNavigator({ navigation }: any) {
  const { isOpen, onOpen, onClose } = useDisclose();
  
  return (
    <ProfileScreenContext.Provider value={{ isOpen, onOpen, onClose }}>
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: 'Home' }}
      />

      <HomeStack.Screen
        name="ItemDetailsScreen"
        component={ItemDetailsScreen}
        options={{
          headerTitle: "Item details",
          headerRight: ProfileSheetHeaderRight,
          headerLeft: () => (
            <IconButton
              onPress={() => {
                navigation.goBack()
              }}
              title="Back"
              _pressed={{
                bg: "transparent",
              }}
              _icon={{
                as: Entypo,
                name: "chevron-small-left",
              }}
            />
          ),
        }}
      />
      </HomeStack.Navigator>
    </ProfileScreenContext.Provider>
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
