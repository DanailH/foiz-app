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
	},
	components: {
		Button: {
			// Can simply pass default props to change default behaviour of components.
			defaultProps: {
				borderRadius: 16,
				_text: {
					fontSize: 16,
					// color: "#fff",
				}
			},
		},
		Heading: {
			backgroundColor: 'black'
		},
		Input: {
			borderColor: '#e6e6e6',
			backgroundColor: '#e6e6e6'
		}
	},
	// typography: {

	// 	fonts: {
	// 		body: {
	// 			color: 'red',
	// 		}
	// 	},
	// },
	// fontConfig: {
	// 	color: 'red',
	// }
});