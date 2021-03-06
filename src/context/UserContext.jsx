import axios from 'axios';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext({});

const URL = {
	today: 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today',
	login: 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login',
};

export function UserProvider({ children }) {
	const [userData, setUserData] = useState({});
	const navigate = useRef(useNavigate());

	const logUserIn = (data, keepConnected) => {
		if (keepConnected) localStorage.setItem('user', JSON.stringify(data));
		setUserData(data);
	};

	const logUserOut = () => {
		localStorage.removeItem('user');
		setUserData({});
		navigate.current('/');
	};

	useEffect(() => {
		const verifyLocalStorageCredentials = () => {
			const userDataString = localStorage.getItem('user');

			if (userDataString) {
				const { email, password } = JSON.parse(userDataString);
				axios
					.post(URL.login, { email, password })
					.then(({ data }) => logUserIn(data))
					.catch(logUserOut);
			} else {
				navigate.current('/');
			}
		};
		verifyLocalStorageCredentials();
	}, []);

	const fetchTodayData = useCallback(() => {
		if (userData.token) {
			axios
				.get(URL.today, { headers: { Authorization: `Bearer ${userData.token}` } })
				.then(({ data }) => {
					setUserData((prevUserData) => {
						return {
							...prevUserData,
							today: data,
						};
					});
				})
				.catch(console.error);
		}
	}, [userData.token]);

	useEffect(fetchTodayData, [fetchTodayData]);

	return (
		<UserContext.Provider value={{ userData, logUserIn, logUserOut, fetchTodayData, navigate }}>
			{children}
		</UserContext.Provider>
	);
}

export default UserContext;
