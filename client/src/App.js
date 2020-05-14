import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/navbar.component';
import Login from './components/login.component';
import Home from './components/home.component';
import Register from './components/register.component';
import { setAxiosAuthHeader } from './utils/axios.utils';

if (localStorage.jwtToken) {
	console.log('JWT token found');
	const token = localStorage.getItem('jwtToken');
	setAxiosAuthHeader(token);
}

function App() {
	return (
		<div className='App'>
			<Router>
				<div>
					<NavBar />
					<Route exact path='/' component={Home} />
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
				</div>
			</Router>
		</div>
	);
}

export default App;
