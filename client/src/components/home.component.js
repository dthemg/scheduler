import React from 'react';
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(1),
			width: theme.spacing(16),
			height: theme.spacing(16),
		},
	},
}));

export default function Home(props) {
	const item = localStorage.getItem('jwtToken');
	const classes = useStyles();

	var decodedItem = '';
	if (item) {
		decodedItem = jwt_decode(item);
	}

	return (
		<div>
			<h1>Home</h1>
			<p>Available for everyone...</p>
			<h2>Jwt token</h2>
			<p>{item}</p>
			<h2>Decoded JWT</h2>
			<p>Id: {decodedItem.id}</p>
			<p>Logged-in user name: {decodedItem.name}</p>
			<p>Expires in: {decodedItem.exp / (1000 * 60 * 60)} hours</p>
			{props.loggedIn ? (
				<div className={classes.root}>
					<Paper>Text on the paper</Paper>
					<Paper>Second item</Paper>
				</div>
			) : (
				<h3>No secret info</h3>
			)}
		</div>
	);
}

Home.propTypes = {
	loggedIn: PropTypes.bool,
};
