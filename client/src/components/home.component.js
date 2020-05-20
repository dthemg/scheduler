import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
	const [appointments, setAppointments] = useState([]);

	const item = localStorage.getItem('jwtToken');
	const classes = useStyles();

	var decodedItem = '';
	if (item) {
		decodedItem = jwt_decode(item);
	}

	// TODO: Keep working from here, Make all appointments show up in a nice way
	useEffect(() => {
		console.log('UseEffect called');
		// If axios token has been set this should work?
		if (item) {
			axios({
				method: 'get',
				url: 'http://localhost:9000/data/getAllCalendarDates',
			})
				.then((res) => {
					console.log(res);
					setAppointments(res.data[0].time);
				})
				.catch((err) => console.log(err));
		}
	}, []);

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
			<p>{appointments}</p>
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
