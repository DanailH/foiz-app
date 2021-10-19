import { extendTheme } from 'native-base';

export const theme = extendTheme({
	colors: {
		primary: {
			50: "#fcf9f9",
			100: "#fcf9f9",
			200: "#e2c6c4",
			300: "#e2c6c4",
			400: "#e2c6c4",
			500: "#e2c6c4",
			600: "#e2c6c4",
			700: "#e2c6c4",
			800: "#e2c6c4",
			900: "#e2c6c4",
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
			50: "b09594",
			100: "b09594",
			200: "b09594",
			300: "b09594",
			400: "b09594",
			500: "b09594",
			600: "b09594",
			700: "b09594",
			800: "b09594",
			900: "b09594",
		},
	},
	components: {
		Button: {
			// Can simply pass default props to change default behaviour of components.
			defaultProps: {
				color: '#fff',
				borderRadius: 16,
				_text: {
					fontSize: 16,
					color: "#000",
				}
			},
		},
		Heading: {
			backgroundColor: 'black'
		}
	},
});