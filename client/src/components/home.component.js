import React from 'react';
import jwt_decode from 'jwt-decode';

export default function Home() {
	const item = localStorage.getItem('jwtToken');
	var decodedItem = '';
	if (item) {
		decodedItem = jwt_decode(item);
	}

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
		</div>
	);
}
