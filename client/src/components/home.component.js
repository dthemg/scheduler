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
	booked: {
		backgroundColor: 'green',
	},
}));

function AppointmentCard(props) {
	const [busy, setBusy] = useState(props.appointmentBusy);
	const classes = useStyles();

	var hrsAndMins = props.appointmentTime.split('T')[1].split(':');
	var hrs = hrsAndMins[0];
	var mins = hrsAndMins[1];

	// TODO: We shouldn't read this value every time we load an appointment
	const token = localStorage.getItem('jwtToken').split(' ')[1];
	const user = jwt_decode(token);

	// TODO: Don't redefine this function, send it as a prop
	const onClick = (event) => {
		event.preventDefault();
		axios({
			method: 'post',
			url: UPDATE_APPOINTMENT_URL,
			data: {
				busy: !busy,
				user_id: user.id,
				appointment_id: props.appointmentId,
			},
		})
			.then((res) => {
				if (res.data.success) {
					setBusy(!busy);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// TODO: Add pending status also that changes color when booking goes through
	// TODO: Add color for your own booking
	return (
		<Card className={classes.card} onClick={onClick}>
			<CardActionArea className={busy ? classes.booked : null}>
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
	appointmentTime: PropTypes.string,
	appointmentId: PropTypes.string,
	appointmentBusy: PropTypes.bool,
	appointmentUserId: PropTypes.string,
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
							{addDayHeader(idx, arr) ? <h1>{getDate(val.time)}</h1> : null}
							<div className={classes.root}>
								<AppointmentCard
									appointmentTime={val.time}
									appointmentId={val._id}
									appointmentBusy={val.busy}
									appointmentUserId={val.user_id}
								/>
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
