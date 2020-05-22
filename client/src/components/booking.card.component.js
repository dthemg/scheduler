import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import jwt_decode from 'jwt-decode';
import { UPDATE_APPOINTMENT_URL } from '../utils/urls';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useTheme } from '@material-ui/styles';

// TODO: Global theming instead of in individual files
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
	bookedByMe: {
		backgroundColor: theme.palette.primary.light,
		color: 'white',
	},
	bookedBySomeoneElse: {
		backgroundColor: '#ffca28',
		color: 'black',
	},
}));

function AppointmentCard(props) {
	const [busy, setBusy] = useState(props.appointmentBusy);
	const theme = useTheme();
	const classes = useStyles(theme);

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

	var color = null;
	if (busy) {
		if (user.id === props.appointmentUserId) {
			color = classes.bookedByMe;
		} else {
			color = classes.bookedBySomeoneElse;
		}
	}

	return (
		<Card className={classes.card} onClick={onClick}>
			<CardActionArea className={color}>
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

export default AppointmentCard;
