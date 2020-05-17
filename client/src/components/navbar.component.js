import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export default function NavBar(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						edge='start'
						className={classes.menuButton}
						color='inherit'
						aria-label='menu'
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' className={classes.title}>
						<a href='/'>Scheduler</a>
					</Typography>
					{props.isLoggedIn ? (
						<div>
							<Button color='inherit' href='./profile'>
								Profile
							</Button>
							<Button color='inherit' href='./login'>
								Log out
							</Button>
						</div>
					) : (
						<div>
							<Button color='inherit' href='./register'>
								Register
							</Button>
							<Button color='inherit' href='./login'>
								Log in
							</Button>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}

NavBar.propTypes = {
	isLoggedIn: PropTypes.bool,
};
