import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components';

const percentage = 66;

export default function ProgressBar() {
	return (
		<Container>
			<CircularProgressbar
				value={percentage}
				text="Today"
				background
				backgroundPadding={6}
				styles={buildStyles({
					backgroundColor: '#3e98c7',
					textColor: '#fff',
					pathColor: '#fff',
					trailColor: 'transparent',
				})}
			/>
		</Container>
	);
}

const Container = styled.div`
	height: 15vh;
	width: 15vh;
	margin-bottom: 5vh;
`;
