import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
	card: {
		maxWidth: 345,
	},
	media: {
		height: 140,
	},
}));

function AppointmentCard(props) {
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			<CardActionArea>
				<CardContent>
					<Typography gutterBottom variant='h5' component='h2'>
						{props.time}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
AppointmentCard.propTypes = {
	time: PropTypes.instanceOf(Date),
};

export default function Home(props) {
	const [appointments, setAppointments] = useState([]);

	const item = localStorage.getItem('jwtToken');
	const classes = useStyles();

	useEffect(() => {
		console.log('UseEffect called');
		if (item) {
			axios({
				method: 'get',
				url: 'http://localhost:9000/data/getAllCalendarDates',
			})
				.then((res) => {
					console.log(res);
					res.data.sort(function (a, b) {
						return new Date(a.date) - new Date(b.date);
					});
					setAppointments(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	return (
		<div>
			<div className={classes.root}>
				{props.loggedIn ? (
					appointments.map((val, idx) => {
						return <AppointmentCard key={idx} time={val.time} />;
					})
				) : (
					<h2>Log in to see available times</h2>
				)}
			</div>
		</div>
	);
}

Home.propTypes = {
	loggedIn: PropTypes.bool,
};
