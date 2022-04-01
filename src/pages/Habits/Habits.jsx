import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import plusIcon from '../../assets/img/plus.png';
import Footer from '../../components/Footer/Footer';
import HabitCard from '../../components/HabitCard/HabitsPage/HabitCard';
import Header from '../../components/Header/Header';
import NewHabit from '../../components/NewHabit/NewHabit';
import SessionContext from '../../context/SessionContext';

const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';

export default function Habits() {
	const { sessionInfo } = useContext(SessionContext);

	const [habits, setHabits] = useState([]);
	const [newHabits, setNewHabits] = useState([]);

	const [habitChange, setHabitChange] = useState(false);

	useEffect(() => {
		axios
			.get(URL, {
				headers: { Authorization: `Bearer ${sessionInfo.token}` },
			})
			.then(({ data }) => setHabits(data))
			.catch((err) => console.error(err));
	}, [sessionInfo, habitChange]);

	const announceNewHabit = () => {
		newHabits.push(newHabits.length);
		setNewHabits([...newHabits]);
	};

	const closeNewHabit = (index) => {
		setNewHabits(newHabits.filter((habit, habitIndex) => habitIndex !== index));
	};

	const announceChange = () => setHabitChange(!habitChange);

	return (
		<>
			<Header imgUrl={sessionInfo.image} />
			<Main>
				<MyHabitsTitle>
					<h1>My Habits</h1>
					<img onClick={announceNewHabit} src={plusIcon} alt="add habit" />
				</MyHabitsTitle>
				{newHabits.map((habit, index) => (
					<NewHabit
						id={index}
						closeHabit={closeNewHabit}
						announceSave={announceChange}
						key={habit}
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
