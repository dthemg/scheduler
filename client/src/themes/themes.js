import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const mainTheme = createMuiTheme({
	palette: {
		secondary: {
			main: green[500],
		},
	},
});

export default mainTheme;
