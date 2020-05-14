import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Copyright, useStyles } from './_common';
import axios from 'axios';

export default function Login() {
	const [state, setState] = useState({
		email: '',
		password: '',
	});
	const classes = useStyles();

	const setAuthenticationToken = (token) => {
		if (token) {
			// All requests should be sent with the jwt auth token
			axios.defaults.headers.common['Authorization'] = token;
		} else {
			// All requests should be sent without any auth token
			delete axios.defaults.headers.common['Authorization'];
		}
	};

	const onChange = (event) => {
		setState({ ...state, [event.target.id]: event.target.value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		console.log(state);
		axios({
			method: 'post',
			url: 'http://localhost:9000/auth/login',
			data: {
				email: state.email,
				password: state.password,
			},
		})
			.then((res) => {
				console.log('Saving jwt token...');
				const token = res.data.token;
				console.log(token);
				// Store token in localstorage
				localStorage.setItem('jwtToken', token);
				// Store token in axios defaults
				setAuthenticationToken(token);
			})
			.catch((res) => {
				console.log(res.response.data.message);
				// This should be done on Logout instead...
				localStorage.removeItem('jwtToken');
				setAuthenticationToken();
			});
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						onChange={onChange}
						autoFocus
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						onChange={onChange}
						autoComplete='current-password'
					/>
					<FormControlLabel
						control={<Checkbox value='remember' color='primary' />}
						label='Remember me'
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						onClick={onSubmit}
						className={classes.submit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href='#' variant='body2'>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href='#' variant='body2'>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}
