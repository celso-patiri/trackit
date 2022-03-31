import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../../components/Footer/Footer';
import HabitCard from '../../components/HabitCard/Today/HabitCard';
import Header from '../../components/Header/Header';
import SessionContext from '../../context/SessionContext';

const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today';
const dayjs = require('dayjs');

export default function Today() {
	const [habits, setHabits] = useState([]);
	const { sessionInfo } = useContext(SessionContext);
	const [habitToggled, setHabitToggled] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(URL, {
				headers: { Authorization: `Bearer ${sessionInfo.token}` },
			})
			.then(({ data }) => setHabits(data))
			.catch((err) => console.error(err));
	}, [sessionInfo, habitToggled]);

	const habitsDone = habits.reduce((sum, habit) => (sum + habit.done ? 1 : 0), 0);
	const percentageDone = (habitsDone / habits.length) * 100;

	return (
		<Main>
			<Header imgUrl={sessionInfo.image} />

			<Title active={percentageDone > 0}>
				<h1>{dayjs().format('dddd, DD/MM')}</h1>
				{percentageDone > 0 ? (
					<h3>{percentageDone}% done today</h3>
				) : (
					<h3>No habit done yet</h3>
				)}
			</Title>

			{habits.length === 0 && (
				<NoHabitsMessage>
					<p>Looks like you haven't got any habits planned for today.</p>
					<button onClick={() => navigate('/habits')}>Go to Habits</button>
				</NoHabitsMessage>
			)}

			{habits.map((habit) => (
				<HabitCard
					name={habit.name}
					streak={habit.currentSequence}
					record={habit.highestSequence}
					done={habit.done}
					id={habit.id}
					annouceToggle={toggleHabit}
					key={habit.id}
				/>
			))}

			<Footer />
		</Main>
	);

	function toggleHabit() {
		setHabitToggled(!habitToggled);
	}
}

const Main = styled.main``;

const Title = styled.div`
	align-self: flex-start;

	h1 {
		font-size: var(--font-size-5);
		color: var(--blue-dark);
		margin-bottom: 1vh;
	}

	h3 {
		font-size: var(--font-size-2);
		color: ${({ active }) => (active ? 'var(--green-done)' : 'var(--gray-light)')};
	}
`;

const NoHabitsMessage = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2vh;

	p {
		color: var(--gray-dark);
		font-size: var(--font-size-4);
		text-align: center;
		margin-top: 6vh;
	}

	button {
		background-color: var(--blue-light);
		color: #fff;
		border: none;
		border-radius: var(--border-radius-1);
		height: 6vh;
		width: 30%;
	}
`;
