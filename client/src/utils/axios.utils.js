import axios from 'axios';

export const setAxiosAuthHeader = (token) => {
	if (token) {
		// All requests should be sent with the jwt auth token
		axios.defaults.headers.common['Authorization'] = token;
	} else {
		// All requests should be sent without any auth token
		delete axios.defaults.headers.common['Authorization'];
	}
};
