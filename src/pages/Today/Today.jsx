import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../../components/Footer/Footer';
import HabitCard from '../../components/HabitCard/TodayPage/HabitCard';
import Header from '../../components/Header/Header';
import UserContext from '../../context/UserContext';

const dayjs = require('dayjs');

export default function Today() {
	const { userData, fetchTodayData } = useContext(UserContext);
	const navigate = useNavigate();

	const [toggle, toggleHabitDone] = useState(false);
	const announceToggle = () => toggleHabitDone(!toggle);

	useEffect(fetchTodayData, [toggle, fetchTodayData]);

	const todayHabits = userData.today ? userData.today : [];
	const habitsDoneToday = todayHabits.reduce((sum, habit) => (habit.done ? sum + 1 : sum), 0);
	const percentageDone = Math.ceil((habitsDoneToday / todayHabits.length) * 100);

	return (
		<>
			<Header imgUrl={userData.image} />
			<main>
				<Title active={percentageDone > 0}>
					<h1>{dayjs().format('dddd, DD/MM')}</h1>
					{percentageDone > 0 ? (
						<h3>{percentageDone}% done today</h3>
					) : (
						<h3>No habit done yet</h3>
					)}
				</Title>

				{todayHabits.length === 0 && (
					<NoHabitsMessage>
						<p>Looks like you haven't got any habits planned for today.</p>
						<button onClick={() => navigate('/habits')}>Go to Habits</button>
					</NoHabitsMessage>
				)}

				{todayHabits.map((habit) => (
					<HabitCard
						name={habit.name}
						streak={habit.currentSequence}
						record={habit.highestSequence}
						done={habit.done}
						id={habit.id}
						annouceToggle={announceToggle}
						key={habit.id}
					/>
				))}
			</main>
			<Footer />
		</>
	);
}

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
