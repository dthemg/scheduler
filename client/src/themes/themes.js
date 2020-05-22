import { createMuiTheme } from '@material-ui/core/styles';

/*
https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=00685b&secondary.color=7986CB
*/
export default createMuiTheme({
	palette: {
		primary: {
			main: '#00685b',
			light: '#439688',
			dark: '#003d32',
		},
		secondary: {
			main: '#7986cb',
			light: '#aab6fe',
			dark: '#49599a',
		},
	},
});
