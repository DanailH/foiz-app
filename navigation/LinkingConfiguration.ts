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
        initialRouteName: 'TabOneScreen',
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'TabOne',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'TabTwo',
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
