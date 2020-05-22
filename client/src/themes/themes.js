import { createMuiTheme } from '@material-ui/core/styles';

const mainTheme = createMuiTheme({
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

export default mainTheme;
