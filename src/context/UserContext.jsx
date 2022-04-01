import axios from 'axios';
import { createContext, useCallback, useEffect, useState } from 'react';

const UserContext = createContext({});

const TODAY_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today';

export function UserProvider({ children }) {
	const [userData, setUserData] = useState({});

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
				.get(TODAY_URL, {
					headers: { Authorization: `Bearer ${userData.token}` },
				})
				.then(({ data }) => updateTodayData(data))
				.catch(console.error);
		}
	}, [userData.token, updateTodayData]);

	useEffect(fetchTodayData, [fetchTodayData]);

	return (
		<UserContext.Provider value={{ userData, setUserData, fetchTodayData }}>
			{children}
		</UserContext.Provider>
	);
}

export default UserContext;
