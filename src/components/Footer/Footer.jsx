import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProgressBar from './ProgressBar';

export default function Footer() {
	const navigate = useNavigate();

	return (
		<StyledFooter>
			<h2 onClick={() => navigate('/habits')}>Habits</h2>
			<ProgressBar navigate={navigate} />
			<h2 onClick={() => navigate('/history')}>History</h2>
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
	box-shadow: 0 -4px 4px rgba(0, 0, 0, 0.1);

	svg {
		border-radius: 50%;
		box-shadow: -1px -2px 4px rgba(0, 0, 0, 0.3);
	}
`;
