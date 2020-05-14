import React from 'react';

export default function Home() {
	const item = localStorage.getItem('jwtToken');

	return (
		<div>
			<h1>Home</h1>
			<p>JWT TOKEN</p>
			<p>{item}</p>
		</div>
	);
}
