import axios from 'axios';
import { useContext, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';
import UserContext from '../../../context/UserContext';

export default function HabitCard({ name, streak, record, done, id, annouceToggle }) {
	const { userData } = useContext(UserContext);
	const [isProcessingRequest, setIsProcessingRequest] = useState(false);

	return (
		<Card onClick={postToggle}>
			<Content>
				<h1>{name}</h1>
				<h3>
					Current streak: <Highlight green={done}>{streak} days</Highlight>
				</h3>
				<h3>
					Personal record:{' '}
					<Highlight green={done && streak >= record}>{record} days</Highlight>
				</h3>
			</Content>
			<Icon done={done} alt="check">
				{isProcessingRequest ? (
					<ThreeDots color="#FFF" height={80} width={50} />
				) : (
					<Check />
				)}
			</Icon>
		</Card>
	);

	function postToggle() {
		if (isProcessingRequest) return;

		const action = done ? 'uncheck' : 'check';
		const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/${action}`;

		setIsProcessingRequest(true);
		axios
			.post(url, {}, { headers: { Authorization: `Bearer ${userData.token}` } })
			.then(annouceToggle)
			.catch(console.error)
			.finally(setTimeout(() => setIsProcessingRequest(false), 800));
	}
}

const Card = styled.section`
	width: 100%;
	max-width: 500px;
	height: 20vh;
	background-color: #fff;
	border-radius: var(--border-radius-1);
	margin-top: 1vh;
	display: flex;
	justify-content: space-between;
	padding: 15px;
	box-shadow: var(--habit-box-shadow);

	animation: slidein 300ms ease-in;
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
	color: ${({ green }) => (green ? 'var(--green-done)' : 'var(--gray-dark)')};
`;

function Check() {
	return (
		<svg
			width="36"
			height="28"
			viewBox="0 0 36 28"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M29.5686 0.956629C30.1694 0.350274 30.9857 0.00637472 31.8392 8.77323e-05C32.6928 -0.00619925 33.5141 0.325638 34.1237 0.923077C34.7333 1.52052 35.0816 2.33498 35.0926 3.18846C35.1035 4.04195 34.7761 4.86506 34.182 5.4779L16.9915 26.9682C16.6962 27.2862 16.3398 27.5413 15.9437 27.7185C15.5476 27.8957 15.1198 27.9912 14.6859 27.9994C14.252 28.0076 13.821 27.9283 13.4184 27.7662C13.0159 27.6041 12.6502 27.3625 12.3431 27.0559L0.945601 15.6628C0.339937 15.0569 -0.000205509 14.2351 9.31541e-08 13.3784C0.000205695 12.5216 0.340743 11.7001 0.946698 11.0944C1.55265 10.4887 2.37439 10.1486 3.23113 10.1488C4.08788 10.149 4.90945 10.4895 5.51511 11.0955L14.5292 20.1117L29.4831 1.05749C29.5103 1.02282 29.5396 0.989868 29.5708 0.958822L29.5686 0.956629Z"
				fill="white"
			/>
		</svg>
	);
}

const Icon = styled.div`
	border-radius: var(--border-radius-1);
	background-color: ${({ done }) => (done ? 'var(--green-done)' : 'var(--gray-lighter)')};
	box-sizing: content-box;
	width: 2.5rem;
	height: 2.5rem;
	padding: 15px;
	align-self: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;
