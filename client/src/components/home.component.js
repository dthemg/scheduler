import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default function Home() {
	const item = localStorage.getItem('jwtToken');
	const decodedItem = jwt_decode(item);

	return (
		<div>
			<h1>Home</h1>
			<h2>Jwt token</h2>
			<p>{item}</p>
			<h2>Decoded JWT</h2>
			<p>Id: {decodedItem.id}</p>
			<p>Logged-in user name: {decodedItem.name}</p>
			<p>Expires in: {decodedItem.exp / (1000 * 60 * 60)} hours</p>
		</div>
	);
}
