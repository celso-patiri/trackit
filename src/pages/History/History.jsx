import axios from 'axios';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import UserContext from '../../context/UserContext';

const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily';
const WEEKDAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function History() {
	const { userData } = useContext(UserContext);

	const [userHabitsData, setUserHabitsData] = useState([]);
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		let isMounted = true;
		if (userData.token) {
			axios
				.get(URL, { headers: { Authorization: `Bearer ${userData.token}` } })
				.then(({ data }) => {
					if (isMounted) setUserHabitsData(data);
				})
				.catch(console.error);
		}
		return () => (isMounted = false);
	}, [userData.token]);

	const getFormatedDate = (dateValue) => dayjs(dateValue).format('DD/MM/YYYY');
	const handleDayClick = (value) => setDate(getFormatedDate(value));

	const selectedDay = userHabitsData.find((entry) => entry.day === date);

	return (
		<>
			<Header imgUrl={userData.image} />
			<Main>
				<CalendarWrapper>
					<Calendar
						onClickDay={handleDayClick}
						defaultValue={new Date()}
						tileClassName={getDateDoneStatus}
					/>
				</CalendarWrapper>
				{selectedDay && (
					<DateHabitsList>
						<h1>{`${WEEKDAY[selectedDay.habits[0].weekDay]} - ${date}`}</h1>
						{selectedDay.habits.map((habit) => {
							return (
								<p key={habit.id}>
									{habit.done ? '✅' : '❌'} - {habit.name}
								</p>
							);
						})}
					</DateHabitsList>
				)}
			</Main>
			<Footer />
		</>
	);

	//Get callendar date classNames
	function getDateDoneStatus({ date: dateTile, view }) {
		if (view !== 'month') return '';
		const dateWithHabits = userHabitsData.find(
			(dateInfo) => dateInfo.day === getFormatedDate(dateTile)
		);
		if (dateWithHabits) return dateWithHabits.done ? 'complete' : 'incomplete';
	}
}

const Main = styled.main`
	position: relative;
	overflow-y: scroll;
	height: 100%;
`;

const CalendarWrapper = styled.div`
	* {
		border-radius: var(--border-radius-2);
	}

	.react-calendar {
		margin: 0 auto;
		border: none;
		box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.15);

		.complete {
			background-color: var(--green-done);
			color: #fff;
		}

		.incomplete {
			background-color: var(--red-incomplete);
			color: #fff;
		}
		&__month-view__days__day {
			border-radius: 17px;
			max-width: 34px;
			max-height: 34px;
			margin: 8px;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		&__tile--now {
			background-color: var(--blue-light) !important ;
			color: #fff !important;
		}

		&__tile--active {
			background-color: var(--blue-dark) !important;
		}
	}

	animation: slidein 500ms ease-in;
`;

const DateHabitsList = styled.div`
	width: 90%;
	margin-top: 2vh;
	padding: 10px;
	background-color: #fff;
	box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.15);
	border-radius: var(--border-radius-2);

	display: flex;
	flex-direction: column;
	align-items: flex-start;

	h1 {
		color: var(--blue-dark);
		margin-bottom: 1rem;
	}

	p {
		color: var(--gray-dark);
		padding: 1vh 5%;
	}
`;
