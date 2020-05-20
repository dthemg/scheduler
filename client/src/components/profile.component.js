import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProfilePage() {
	const [state, setState] = useState({
		name: '',
		email: '',
		createdOn: '',
	});

	useEffect((state) => {
		console.log('UseEffect called');
		// If axios token has been set this should work?
		axios({
			method: 'post',
			url: 'http://localhost:9000/data/profile',
		})
			.then((res) => {
				console.log(res);
				setState({
					...state,
					name: res.data.name,
					email: res.data.email,
					createdOn: res.data.created,
				});
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<h3>Profile page</h3>
			<p>Your name is: </p>
			<p>{state.name}</p>
			<p>Your email is: </p>
			<p>{state.email}</p>
			<p>Your account was created:</p>
			<p>{state.createdOn}</p>
		</div>
	);
}
