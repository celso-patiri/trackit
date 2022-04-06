import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from '../../components/Footer/Footer';
import HabitCard from '../../components/HabitCard/HabitsPage/HabitCard';
import Header from '../../components/Header/Header';
import NewHabit from '../../components/NewHabit/NewHabit';
import UserContext from '../../context/UserContext';

const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';

export default function Habits() {
	const { userData, fetchTodayData } = useContext(UserContext);

	const [habits, setHabits] = useState([]);
	const [newHabits, setNewHabits] = useState({ open: [], closed: [] });

	const [habitChange, setHabitChange] = useState(false);
	const announceChange = () => setHabitChange(!habitChange);

	useEffect(() => {
		let isMounted = true;
		if (userData.token) {
			axios
				.get(URL, { headers: { Authorization: `Bearer ${userData.token}` } })
				.then(({ data }) => {
					if (isMounted) setHabits(data);
				})
				.catch(console.error);
		}
		return () => (isMounted = false);
	}, [userData.token, habitChange]);

	useEffect(fetchTodayData, [habits.length, fetchTodayData]);

	const announceNewHabit = () => {
		const newId = newHabits.open.length + newHabits.closed.length;
		const newHabit =
			newHabits.closed.length > 0
				? newHabits.closed.pop()
				: { id: newId, name: '', weekdays: [] };

		setNewHabits({
			...newHabits,
			open: [newHabit, ...newHabits.open],
		});
	};

	const closeNewHabit = (index, name, weekdays) => {
		newHabits.closed.push({ id: index, name, weekdays });
		newHabits.open = newHabits.open.filter((habit) => habit.id !== index);
		setNewHabits({ ...newHabits });
	};

	return (
		<>
			<Header imgUrl={userData.image} />
			<Main>
				<MyHabitsTitle>
					<h1>My Habits</h1>
					<PlusIcon announceNewHabit={announceNewHabit} />
				</MyHabitsTitle>
				{newHabits.open.map((habit) => (
					<NewHabit
						id={habit.id}
						closeHabit={closeNewHabit}
						announceSave={announceChange}
						name={habit.name}
						weekdays={habit.weekdays}
						key={habit.toString() + habit.id}
					/>
				))}
				{habits.length === 0 && (
					<Paragraph>
						You haven't added any habits yet. Add a habit to start tracking!
					</Paragraph>
				)}
				{habits.map((habit) => (
					<HabitCard
						name={habit.name}
						days={habit.days}
						id={habit.id}
						announceDelete={announceChange}
						key={habit.id}
					/>
				))}
			</Main>
			<Footer />
		</>
	);
}

function PlusIcon({ announceNewHabit }) {
	return (
		<PlusContainer onClick={announceNewHabit}>
			<svg
				width="14"
				height="14"
				viewBox="0 0 14 14"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M0.244925 8.66063V6.23279H5.55921V0.837576H8.39169V6.23279H13.7599V8.66063H8.39169V13.867H5.55921V8.66063H0.244925Z"
					fill="white"
				/>
			</svg>
		</PlusContainer>
	);
}

const PlusContainer = styled.div`
	padding: 10px;
	background-color: var(--blue-light);
	border-radius: var(--border-radius-1);
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: -2px 2px 3px rgba(0, 0, 0, 0.15);
	cursor: pointer;
`;

const Main = styled.main`
	padding: 21px;
`;

const MyHabitsTitle = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	color: var(--blue-dark);
	font-size: var(--font-size-5);
	margin-bottom: 4vh;

	img {
		padding: 6px;
		width: 2rem;
		border-radius: var(--border-radius-1);
		background-color: var(--blue-light);
		cursor: pointer;
	}
`;

const Paragraph = styled.p`
	color: var(--gray-dark);
	font-size: var(--font-size-4);
	text-align: center;
	margin-top: 6vh;
`;
