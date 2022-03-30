import styled from 'styled-components';
import ProgressBar from './ProgressBar';

export default function Footer() {
	return (
		<StyledFooter>
			<h2>Habits</h2>
			<ProgressBar />
			<h2>History</h2>
		</StyledFooter>
	);
}

const StyledFooter = styled.footer`
	width: 100%;
	height: var(--footer-height);
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	bottom: 0;
	color: var(--blue-light);
	background-color: #fff;
	padding: 5px 25px;
	font-size: var(--font-size-3);
`;
