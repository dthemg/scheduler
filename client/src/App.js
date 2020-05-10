import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/navbar.component';

function App() {
	return (
		<div className='App'>
			<div>
				<NavBar />
			</div>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>Home page here</p>
			</header>
		</div>
	);
}

export default App;
