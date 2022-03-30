import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import SessionContext from '../../context/SessionContext';

const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today';
const dayjs = require('dayjs');

export default function Today() {
	const [habits, setHabits] = useState([]);
	const { sessionInfo } = useContext(SessionContext);

	console.log(habits);

	useEffect(() => {
		axios
			.get(URL, {
				headers: { Authorization: `Bearer ${sessionInfo.token}` },
			})
			.then(({ data }) => setHabits(data))
			.catch((err) => console.error(err));
	}, [sessionInfo]);

	return (
		<Main>
			<Header imgUrl={sessionInfo.image} />
			<Title>
				<h1>{dayjs().format('dddd, DD/MM')}</h1>
				<h3>Nenhum hábito concluido ainda</h3>
			</Title>
			{habits.length == 0 && (
				<Paragraph>
					You haven't added any habits yet. Add a habit to start tracking!
				</Paragraph>
			)}

			<Footer />
		</Main>
	);
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
		color: var(--gray-light);
	}
`;

const Paragraph = styled.p`
	color: var(--gray-dark);
	font-size: var(--font-size-4);
	text-align: center;
	margin-top: 6vh;
`;
