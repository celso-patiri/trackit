import { useContext, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import SessionContext from '../../context/SessionContext';
import plusIcon from '../../assets/img/plus.png';

export default function Today() {
	const [habits, setHabits] = useState(null);
	const { sessionInfo } = useContext(SessionContext);

	console.log(sessionInfo);
	return (
		<Main>
			<Header imgUrl={sessionInfo.image} />
			<MyHabitsTitle>
				<h1>My Habits</h1>
				<img src={plusIcon} alt="add habit" />
			</MyHabitsTitle>
			{!habits && (
				<Paragraph>
					You haven't added any habits yet. Add a habit to start tracking!
				</Paragraph>
			)}
		</Main>
	);
}

const Main = styled.main`
	margin-top: var(--header-height);
	padding: 21px;
`;

const MyHabitsTitle = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	color: var(--blue-dark);
	font-size: var(--font-size-5);

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
