import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import SessionContext from '../../context/SessionContext';
import plusIcon from '../../assets/img/plus.png';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import NewHabit from '../../components/NewHabit/NewHabit';
import HabitCard from '../../components/HabitCard/HabitsPage/HabitCard';

const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';

export default function Habits() {
	const [habits, setHabits] = useState([]);
	const [newHabits, setNewHabits] = useState([]);
	const [newHabitSaved, setNewHabitSaved] = useState(false);

	const { sessionInfo } = useContext(SessionContext);

	useEffect(() => {
		axios
			.get(URL, {
				headers: { Authorization: `Bearer ${sessionInfo.token}` },
			})
			.then(({ data }) => setHabits(data))
			.catch((err) => console.error(err));
	}, [sessionInfo, newHabitSaved]);

	return (
		<Main>
			<Header imgUrl={sessionInfo.image} />
			<MyHabitsTitle>
				<h1>My Habits</h1>
				<img onClick={addNewHabit} src={plusIcon} alt="add habit" />
			</MyHabitsTitle>
			{newHabits.map((habit, index) => (
				<NewHabit
					id={index}
					removeHabit={removeNewHabit}
					announceSave={announceSave}
					key={habit}
				/>
			))}
			{habits.length === 0 && (
				<Paragraph>
					You haven't added any habits yet. Add a habit to start tracking!
				</Paragraph>
			)}
			{habits.map((habit) => (
				<HabitCard name={habit.name} days={habit.days} id={habit.id} key={habit.id} />
			))}

			<Footer />
		</Main>
	);

	function addNewHabit() {
		newHabits.push(newHabits.length);
		setNewHabits([...newHabits]);
	}

	function removeNewHabit(index) {
		setNewHabits(newHabits.filter((habit, habitIndex) => habitIndex !== index));
	}

	function announceSave() {
		setNewHabitSaved(!newHabitSaved);
	}
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
