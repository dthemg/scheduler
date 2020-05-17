import React from 'react';
import axios from 'axios';

export default function ProfilePage() {
	// If axios token has been set this should work?
	const profile = axios({
		method: 'post',
		url: 'http://localhost:9000/data/profile',
	});

	return <h3>Profile page</h3>;
}
