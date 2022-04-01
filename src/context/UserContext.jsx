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

	const setUserSession = (data) => {
		localStorage.setItem('user', JSON.stringify(data));
		setUserData(data);
	};

	const verifyCredentials = useCallback(() => {
		const userSessionString = localStorage.getItem('user');

		if (!userSessionString) {
			navigate.current('/');
			return;
		}

		const user = JSON.parse(userSessionString);
		axios
			.post(URL.login, { email: user.email, password: user.password })
			.then(({ data }) => setUserSession(data))
			.catch((err) => {
				setUserData({});
				localStorage.removeItem('user');
				navigate.current('/');
			});
	}, []);

	useEffect(verifyCredentials, [verifyCredentials]);

	const fetchTodayData = useCallback(() => {
		if (userData.token) {
			axios
				.get(URL.today, {
					headers: { Authorization: `Bearer ${userData.token}` },
				})
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
		<UserContext.Provider value={{ userData, setUserSession, fetchTodayData, navigate }}>
			{children}
		</UserContext.Provider>
	);
}

export default UserContext;
