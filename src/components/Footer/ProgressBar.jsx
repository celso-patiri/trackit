import { useContext } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components';
import UserContext from '../../context/UserContext';

export default function ProgressBar({ navigate }) {
	const { userData } = useContext(UserContext);

	const todayHabits = userData.today ? userData.today : [];
	const habitsDoneToday = todayHabits.reduce((sum, habit) => (habit.done ? sum + 1 : sum), 0);
	const percentageDone = Math.ceil((habitsDoneToday / todayHabits.length) * 100);

	return (
		<Container onClick={() => navigate('/today')}>
			<CircularProgressbar
				value={percentageDone}
				text="Today"
				background
				backgroundPadding={6}
				styles={buildStyles({
					backgroundColor: '#3e98c7',
					textColor: '#fff',
					pathColor: '#fff',
					trailColor: 'transparent',
				})}
			/>
		</Container>
	);
}

const Container = styled.div`
	height: 15vh;
	width: 15vh;
	margin-bottom: 5vh;
	cursor: pointer;
`;
