/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        initialRouteName: 'HomeScreen',
        screens: {
          Home: {
            screens: {
              HomeScreen: 'Home',
            },
          },
          Sell: {
            screens: {
              SellScreen: 'Sell an item',
            },
          },
          Profile: {
            screens: {
              ProfileScreen: 'Profile',
              EditProfileScreen: 'EditProfile',
            },
          },
          ItemDetails: {
            screens: {
              ItemDetailScreen: 'Item Details',
            },
          },
        },
      },
      Auth: {
        initialRouteName: 'SignInScreen',
        screens: {
          SignInScreen: 'SignIn',
          SignUpScreen: 'SignUp',
        },
      },
      NotFound: '*',
    },
  },
};
