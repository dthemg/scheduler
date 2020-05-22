import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { ALL_DATES_URL } from '../utils/urls';
import AppointmentCard from './booking.card.component';

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
								<div>
									<Typography variant='h4'>{getDate(val.time)}</Typography>
								</div>
							) : null}
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
// TODO: This loggedIn function seems to not work that well...
Home.propTypes = {
	loggedIn: PropTypes.bool,
};
