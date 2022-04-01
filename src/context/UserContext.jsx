import axios from 'axios';
import { createContext, useCallback, useEffect, useState } from 'react';

const UserContext = createContext({});

const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today';

export function UserProvider({ children }) {
	const [userData, setUserData] = useState({});

	console.log(userData);

	const updateTodayData = useCallback((todayData) => {
		setUserData((prevUserData) => {
			return {
				...prevUserData,
				today: todayData,
			};
		});
	}, []);

	const fetchTodayData = useCallback(() => {
		if (userData.token) {
			axios
				.get(URL, {
					headers: { Authorization: `Bearer ${userData.token}` },
				})
				.then(({ data }) => updateTodayData(data))
				.catch(console.error);
		}
	}, [userData.token, updateTodayData]);

	useEffect(() => {
		console.log('efeito rodou');
		fetchTodayData();
	}, [fetchTodayData]);

	return (
		<UserContext.Provider value={{ userData, setUserData, fetchTodayData }}>
			{children}
		</UserContext.Provider>
	);
}

export default UserContext;
