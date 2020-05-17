import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProfilePage() {
	const [state, setState] = useState({
		name: '',
		email: '',
	});

	useEffect(() => {
		console.log('UseEffect called');
		// If axios token has been set this should work?
		axios({
			method: 'post',
			url: 'http://localhost:9000/data/profile',
		})
			.then((res) => {
				console.log(res);
				setState({ ...state, name: res.data.message });
			})
			.catch((err) => console.log(err));
	}, []);

	//debugger;

	return (
		<div>
			<h3>Profile page</h3>
			<p>Your name is: </p>
			<p>{state.name}</p>
			<p>Your email is: </p>
			<p>{state.email}</p>
		</div>
	);
}
