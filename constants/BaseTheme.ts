import { extendTheme } from 'native-base';

export const theme = extendTheme({
  colors: {
    primary: {
      50: "#fcf9f9",
      100: "#fcf9f9",
      200: "#eb5757",
      300: "#eb5757",
      400: "#eb5757",
      500: "#eb5757",
      600: "#eb5757",
      700: "#eb5757",
      800: "#eb5757",
      900: "#eb5757",
    },
    secondary: {
      50: "black",
      100: "black",
      200: "black",
      300: "black",
      400: "black",
      500: "black",
      600: "black",
      700: "black",
      800: "black",
      900: "black",
    },
    peony: {
      50: "#b09594",
      100: "#b09594",
      200: "#b09594",
      300: "#b09594",
      400: "#b09594",
      500: "#b09594",
      600: "#b09594",
      700: "#b09594",
      800: "#b09594",
      900: "#b09594",
    },
    bgColor: {
      50: "#faf7f3",
      100: "#faf7f3",
      200: "#faf7f3",
      300: "#faf7f3",
      400: "#faf7f3",
      500: "#faf7f3",
      600: "#faf7f3",
      700: "#faf7f3",
      800: "#faf7f3",
      900: "#faf7f3",
    },
    warning: {
      50: "#f03e53",
      100: "#f03e53",
      200: "#f03e53",
      300: "#f03e53",
      400: "#f03e53",
      500: "#f03e53",
      600: "#f03e53",
      700: "#f03e53",
      800: "#f03e53",
      900: "#f03e53",
    },
  },
  components: {
    View: {
      backgroundColor: '#fff'
    },
    Button: {
      defaultProps: {
        borderRadius: 16,
        _text: {
          fontSize: 16,
        }
      },
    },
    Text: {
      defaultProps: {
        fontSize: 'sm',
      },
    },
    Heading: {
      backgroundColor: 'black'
    },
    Input: {
      borderColor: '#e6e6e6',
      backgroundColor: '#e6e6e6',
    },
    IconButton: {
      defaultProps: {
        _pressed: {
          bg: "#fff",
        }
      }
    }
  },
});