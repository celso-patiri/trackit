import axios from 'axios';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import SessionContext from '../../context/SessionContext';
import DayCheckbox from '../DayCheckbox/DayCheckbox';

const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function NewHabit({ removeHabit, id }) {
	const [isProcessingRequest, setIsProcessingRequest] = useState(false);
	const [habitName, setHabitName] = useState('');
	const [selectedDays, setSelectedDays] = useState(Array(7).fill(false));

	const { sessionInfo } = useContext(SessionContext);

	return (
		<HabitForm>
			<NameInput
				value={habitName}
				onChange={handleInput}
				type="text"
				placeholder="Habit name"
				required
				disabled={isProcessingRequest}
			/>
			<Days>
				{WEEKDAYS.map((day, index) => (
					<DayCheckbox
						day={day}
						toggle={() => selectDay(index)}
						disabled={isProcessingRequest}
						key={day + index}
					/>
				))}
			</Days>
			<Buttons>
				<Cancel onClick={handleCancel}>Cancel</Cancel>
				<Save onClick={handleSave}>Save</Save>
			</Buttons>
		</HabitForm>
	);

	function handleInput(e) {
		setHabitName(e.target.value);
	}

	function handleCancel(e) {
		e.preventDefault();
		removeHabit(id);
	}

	function handleSave(e) {
		e.preventDefault();
		if (habitName.length === 0) return;

		axios
			.post(
				URL,
				{
					name: habitName,
					days: selectedDays.filter((day) => day).map((it, index) => index),
				},
				{
					headers: {
						Authorization: `Bearer ${sessionInfo.token}`,
					},
				}
			)
			.then((res) => console.log(res))
			.catch((err) => console.error(err));
	}

	function selectDay(index) {
		selectedDays[index] = !selectedDays[index];
		setSelectedDays([...selectedDays]);
	}
}
const HabitForm = styled.form`
	background-color: #fff;
	width: 100%;
	height: 30vh;
	border-radius: var(--border-radius-1);
	margin-top: 2vh;
	padding: 15px;
	display: flex;
	flex-direction: column;
`;

const NameInput = styled.input`
	width: 100%;
	height: 35%;
	font-size: var(--font-size-3);
	border-radius: var(--border-radius-1);
	border: var(--input-border);
	color: var(--gray-dark);
	padding: 5px;
	margin-bottom: 4px;
`;

const Days = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
`;

const Buttons = styled.div`
	display: flex;
	justify-content: flex-end;
	align-self: flex-end;
	margin-top: 10%;
	width: 50%;
	gap: 20px;

	button {
		font-size: var(--font-size-3);
		width: 40%;
		height: 30px;
		border: none;
		border-radius: var(--border-radius-1);

		&:disabled {
			opacity: 0.7;
		}
	}
`;

const Save = styled.button`
	color: var(--text-light);
	background-color: var(--blue-light);
`;

const Cancel = styled.button`
	color: var(--blue-light);
	background-color: #fff;
`;
