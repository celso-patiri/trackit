import axios from 'axios';
import { useContext, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';
import UserContext from '../../context/UserContext';
import DayCheckbox from '../DayCheckbox/DayCheckbox';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';

export default function NewHabit({ closeHabit, id, announceSave }) {
	const { userData } = useContext(UserContext);

	const [habitName, setHabitName] = useState('');
	const [selectedDays, setSelectedDays] = useState([]);
	const [isProcessingRequest, setIsProcessingRequest] = useState(false);

	const handleInput = (e) => setHabitName(e.target.value);

	const handleCancel = (e) => {
		e.preventDefault();
		if (!isProcessingRequest) closeHabit(id);
	};

	const selectDay = (weekDay) => {
		selectedDays.push(weekDay);
		setSelectedDays([...selectedDays]);
	};

	const saveHabit = (e) => {
		e.preventDefault();
		if (habitName.length === 0 || isProcessingRequest) return;

		setIsProcessingRequest(true);
		axios
			.post(
				URL,
				{
					name: habitName,
					days: selectedDays,
				},
				{
					headers: { Authorization: `Bearer ${userData.token}` },
				}
			)
			.then((res) => {
				closeHabit(id);
				announceSave();
			})
			.catch((err) => setIsProcessingRequest(false));
	};

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
				{WEEKDAYS.map((weekDay, index) => (
					<DayCheckbox
						weekDay={weekDay}
						toggle={() => selectDay(index)}
						disabled={isProcessingRequest}
						key={weekDay + index}
					/>
				))}
			</Days>
			<Buttons>
				<Cancel onClick={handleCancel}>Cancel</Cancel>
				<Save onClick={saveHabit}>
					{isProcessingRequest ? (
						<ThreeDots color="#FFF" height={70} width={70} />
					) : (
						'Save'
					)}
				</Save>
			</Buttons>
		</HabitForm>
	);
}

const HabitForm = styled.form`
	background-color: #fff;
	width: 100%;
	max-width: 500px;
	height: 30vh;
	border-radius: var(--border-radius-1);
	margin-top: 2vh;
	padding: 15px;
	display: flex;
	flex-direction: column;
	box-shadow: var(--habit-box-shadow);
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
	margin-top: 10px;
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

	div {
		height: 100%;
		display: flex;
		align-items: center;
	}
`;

const Cancel = styled.button`
	color: var(--blue-light);
	background-color: #fff;
`;
