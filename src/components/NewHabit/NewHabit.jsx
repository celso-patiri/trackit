import axios from 'axios';
import { useContext, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';
import UserContext from '../../context/UserContext';
import DayCheckbox from '../DayCheckbox/DayCheckbox';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';

export default function NewHabit({ closeHabit, id, name, weekdays, announceSave }) {
	const { userData } = useContext(UserContext);

	const [habitName, setHabitName] = useState(name);
	const [selectedDays, setSelectedDays] = useState(weekdays || []);
	const [isProcessingRequest, setIsProcessingRequest] = useState(false);

	const inputIsValid = habitName && selectedDays.length > 0;

	const handleInput = (e) => setHabitName(e.target.value);

	const handleCancel = (e) => {
		e.preventDefault();
		if (!isProcessingRequest) closeHabit(id, habitName, selectedDays);
	};

	const toggleDaySelect = (weekDay) => {
		if (selectedDays.some((day) => day === weekDay)) {
			setSelectedDays(selectedDays.filter((day) => day !== weekDay));
		} else {
			setSelectedDays([...selectedDays, weekDay]);
		}
	};

	const saveHabit = (e) => {
		e.preventDefault();
		if (!inputIsValid || isProcessingRequest) return;

		setIsProcessingRequest(true);
		axios
			.post(
				URL,
				{ name: habitName, days: selectedDays },
				{ headers: { Authorization: `Bearer ${userData.token}` } }
			)
			.then(() => {
				closeHabit(id);
				announceSave();
			})
			.catch(() => setIsProcessingRequest(false));
	};

	return (
		<HabitForm onKeyPress={(e) => e.key === 'Enter' && saveHabit(e)}>
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
						toggle={() => toggleDaySelect(index)}
						isChecked={selectedDays.includes(index)}
						disabled={isProcessingRequest}
						key={weekDay + index}
					/>
				))}
			</Days>
			<Buttons>
				<Cancel onClick={handleCancel}>Cancel</Cancel>
				<Save onClick={saveHabit} active={inputIsValid} type="submit">
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

	animation: slidein 300ms ease-in;
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

	input {
		cursor: pointer;
	}
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

		cursor: pointer;

		&:disabled {
			opacity: 0.7;
		}
	}
`;

const Save = styled.button`
	color: var(--text-light);
	background-color: ${({ active }) => (active ? 'var(--blue-light)' : 'var(--gray-light)')};
	box-shadow: -2px 2px 3px rgba(0, 0, 0, 0.25);

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
