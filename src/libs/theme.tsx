import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";

const styles = {
	global: props => ({
		body: {
			bg: mode('#f5f5f7', '#202023')(props)
		},
		a: {
			color: mode('#3d7aed', '#1bb9c6')(props),
			textUnderlineOffset: 3,
		},
	})
};

const components = {
	Heading: {
		variants: {
			'selection-title': {
				textDecoration: 'underline',
				fontSize: 20,
				textUnderlineOffset: 6,
				textDecorationColor: '#525252',
				textDecorationThickness: 4,
				marginTop: 3,
				marginBottom: 4
			},
		}
	},
	Link: {
		baseStyle: props => ({
			color: mode('#3d7aed', '#1bb9c6')(props),
			textUnderlineOffset: 3,
		})
	},
}

const fonts = {
	heading: "'M PLUS Rounded 1c'",
}

const colors = {
	glassTeal: '#88ccca'
}

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: true
}

const theme = extendTheme({
	styles,
	components,
	fonts,
	colors,
	config
});

export default theme;
