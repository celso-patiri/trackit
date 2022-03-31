import styled from 'styled-components';
import DayCheckbox from '../../DayCheckbox/DayCheckbox';
import trashcan from '../../../assets/img/trash-can.png';
import { useContext } from 'react';
import SessionContext from '../../../context/SessionContext';
import axios from 'axios';

const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function HabitCard({ name, days, id, announceDelete }) {
	const { sessionInfo } = useContext(SessionContext);

	return (
		<Card>
			<HabitName>{name}</HabitName>
			<Days>
				{WEEKDAYS.map((day, index) => (
					<DayCheckbox
						day={day}
						isChecked={days.includes(index)}
						key={day + index}
						toggle={preventToggle}
					/>
				))}
			</Days>
			<Trashcan onClick={deleteHabit} src={trashcan} alt="delete" />
		</Card>
	);

	function deleteHabit() {
		axios
			.delete(`${URL}/${id}`, {
				headers: { Authorization: `Bearer ${sessionInfo.token}` },
				data: { id, name, days },
			})
			.then(announceDelete)
			.catch((err) => console.error(err));
	}
}

function preventToggle(e) {
	e.preventDefault();
}

const HabitName = styled.h1`
	color: var(--gray-dark);
	font-size: var(--font-size-4);
`;

const Card = styled.div`
	width: 100%;
	height: 20vh;
	background-color: #fff;
	border-radius: var(--border-radius-1);
	margin-top: 1vh;
	padding: 15px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	position: relative;
`;

const Days = styled.div`
	display: flex;
	gap: 3px;
	margin-top: 1vh;
`;

const Trashcan = styled.img`
	width: 1rem;
	position: absolute;
	top: 10px;
	right: 10px;
`;
