import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ALL_DATES_URL, UPDATE_APPOINTMENT_URL } from '../utils/urls';
import jwt_decode from 'jwt-decode';

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
		maxHeight: 60,
	},
}));

function AppointmentCard(props) {
	const classes = useStyles();

	var hrsAndMins = props.time.split('T')[1].split(':');
	var hrs = hrsAndMins[0];
	var mins = hrsAndMins[1];

	const onClick = (event) => {
		const token = localStorage.getItem('jwtToken').split(' ')[1];
		const user = jwt_decode(token);

		event.preventDefault();
		axios({
			method: 'post',
			url: UPDATE_APPOINTMENT_URL,
			data: {
				busy: true,
				user_id: user.id,
				appointment_id: props.appointment_id,
			},
		}).then((res) => console.log(res));
	};

	return (
		<Card className={classes.card} onClick={onClick}>
			<CardActionArea>
				<CardContent>
					<Typography gutterBottom variant='h5' component='h2'>
						{hrs} : {mins}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
AppointmentCard.propTypes = {
	time: PropTypes.string,
	appointment_id: PropTypes.string,
};

export default function Home(props) {
	const [appointments, setAppointments] = useState([]);
	const classes = useStyles();

	useEffect(() => {
		if (localStorage.getItem('jwtToken')) {
			axios({
				method: 'get',
				url: ALL_DATES_URL,
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

	const getDate = (dateString) => {
		return dateString.split('T')[0];
	};

	const addDayHeader = (idx, arr) => {
		if (idx === 0) {
			return true;
		}

		if (getDate(arr[idx - 1].time) !== getDate(arr[idx].time)) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<div>
			{props.loggedIn ? (
				appointments.map((val, idx, arr) => {
					return (
						<div key={idx}>
							{addDayHeader(idx, arr) ? (
								<h1>{getDate(val.time)}</h1>
							) : (
								<h1></h1>
							)}
							<div className={classes.root}>
								<AppointmentCard time={val.time} appointment_id={val._id} />
							</div>
						</div>
					);
				})
			) : (
				<h2>Log in to see available times</h2>
			)}
		</div>
	);
}

Home.propTypes = {
	loggedIn: PropTypes.bool,
};
