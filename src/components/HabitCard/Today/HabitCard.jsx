import styled from 'styled-components';

import checkIcon from '../../../assets/img/check.png';

export default function HabitCard({ name, streak, record }) {
	return (
		<Card>
			<Content>
				<h1>{name}</h1>
				<h3>Current streak: {streak} days</h3>
				<h3>Personal record: {record} days</h3>
			</Content>
			<Icon src={checkIcon} alt="check" />
		</Card>
	);
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

const Icon = styled.img`
	border-radius: var(--border-radius-1);
	background-color: var(--gray-lighter);
	box-sizing: content-box;
	width: 2.5rem;
	height: 2.5rem;
	padding: 15px;
	align-self: center;
`;
