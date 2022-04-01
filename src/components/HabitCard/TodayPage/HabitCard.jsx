import axios from 'axios';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import checkIcon from '../../../assets/img/check.png';
import UserContext from '../../../context/UserContext';

export default function HabitCard({ name, streak, record, done, id, annouceToggle }) {
	const { userData } = useContext(UserContext);
	const [isProcessingRequest, setIsProcessingRequest] = useState(false);

	return (
		<Card onClick={checkTogglePOST}>
			<Content>
				<h1>{name}</h1>
				<h3>
					Current streak: <Highlight active={done}>{streak} days</Highlight>
				</h3>
				<h3>
					Personal record:{' '}
					<Highlight active={done && streak >= record}>{record} days</Highlight>
				</h3>
			</Content>
			<Icon src={checkIcon} done={done} alt="check" />
		</Card>
	);

	function checkTogglePOST() {
		if (isProcessingRequest) return;

		const action = done ? 'uncheck' : 'check';
		const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/${action}`;

		setIsProcessingRequest(true);
		axios
			.post(
				url,
				{},
				{
					headers: { Authorization: `Bearer ${userData.token}` },
				}
			)
			.then(annouceToggle)
			.catch((err) => console.error(err))
			.finally(() => setIsProcessingRequest(false));
	}
}

const Card = styled.section`
	width: 100%;
	height: 20vh;
	background-color: #fff;
	border-radius: var(--border-radius-1);
	margin: 2vh 0;
	display: flex;
	justify-content: space-between;
	padding: 15px;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	color: var(--gray-dark);
	font-size: var(--font-size-3);

	h1 {
		margin-bottom: 2vh;
	}

	h3 {
		font-size: var(--font-size-1);
	}
`;

const Highlight = styled.span`
	color: ${({ active }) => (active ? 'var(--green-done)' : 'var(--gray-dark)')};
`;

const Icon = styled.img`
	border-radius: var(--border-radius-1);
	background-color: ${({ done }) => (done ? 'var(--green-done)' : 'var(--gray-lighter)')};
	box-sizing: content-box;
	width: 2.5rem;
	height: 2.5rem;
	padding: 15px;
	align-self: center;
`;
