import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/navbar.component';
import Login from './components/login.component';
import Home from './components/home.component';
import Register from './components/register.component';
import { setAxiosAuthHeader } from './utils/axios.utils';
import Profile from './components/profile.component';
import { ThemeProvider } from '@material-ui/core';
import mainTheme from './themes/themes';

// TODO: Have a look at this part
if (localStorage.jwtToken) {
	console.log('JWT token found');
	const token = localStorage.getItem('jwtToken');
	setAxiosAuthHeader(token);
}

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	useEffect(() => {
		if (localStorage.jwtToken) {
			setLoggedIn(true);
		}
	}, []);

	return (
		// TODO: Keep looking at themeprovider...
		<ThemeProvider theme={mainTheme}>
			<div className='App'>
				<Router>
					<div>
						<NavBar isLoggedIn={loggedIn} />
						<Route exact path='/' render={() => <Home loggedIn={loggedIn} />} />
						<Route path='/profile' component={Profile} />
						<Route
							path='/login'
							render={() => <Login setLoggedIn={setLoggedIn} />}
						/>
						<Route path='/register' component={Register} />
					</div>
				</Router>
			</div>
		</ThemeProvider>
	);
}

export default App;
