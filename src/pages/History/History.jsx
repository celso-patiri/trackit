import axios from 'axios';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import SessionContext from '../../context/SessionContext';

const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily';

export default function History() {
	const { sessionInfo } = useContext(SessionContext);

	const [daysWithHabits, setDayswithHabits] = useState([]);
	const [today, setToday] = useState(new Date());

	useEffect(() => {
		axios
			.get(URL, { headers: { Authorization: `Bearer ${sessionInfo.token}` } })
			.then(({ data }) => setDayswithHabits(data.map((entry) => entry.day)))
			.catch(console.error);
	}, [sessionInfo]);

	return (
		<>
			<Header imgUrl={sessionInfo.image} />
			<Main>
				<CalendarWrapper>
					<Calendar onChange={setToday} value={today} tileClassName={getDateDoneStatus} />
				</CalendarWrapper>
			</Main>
			<Footer />
		</>
	);

	function getDateDoneStatus({ date, view }) {
		if (view !== 'month') return '';
		const dateHasHabits = daysWithHabits.find(
			(day) => day === dayjs(date).format('DD/MM/YYYY')
		);
		if (dateHasHabits) return dateHasHabits.done ? 'complete' : 'incomplete';
	}
}

const Main = styled.main`
	position: relative;
	overflow-y: scroll;
	height: 100%;
`;

const CalendarWrapper = styled.div`
	height: 100%;
	position: absolute;

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
			border-radius: 14px;
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
`;
