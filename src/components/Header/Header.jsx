import { useContext, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../../context/UserContext';

export default function Header({ imgUrl }) {
	const { navigate, logUserOut } = useContext(UserContext);

	const [displayLogout, setDisplayLogout] = useState(false);
	const toggleLogout = () => setDisplayLogout(!displayLogout);

	return (
		<StyledHeader>
			<h1 onClick={() => navigate.current('/')}>TrackIt</h1>
			<Flex>
				{displayLogout && <LogOut onClick={logUserOut}>LogOut</LogOut>}
				<UserAvatar src={imgUrl} onClick={toggleLogout} alt="user avatar" />
			</Flex>
		</StyledHeader>
	);
}

const StyledHeader = styled.header`
	background-color: var(--blue-dark);
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	top: 0;
	padding: 10px 15px;
	width: 100%;
	height: var(--header-height);
	box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
	z-index: 2;

	cursor: pointer;

	h1 {
		font-size: var(--font-size-6);
		color: var(--text-light);
	}
`;

const Flex = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const UserAvatar = styled.img`
	border-radius: 50%;
	width: 3rem;
	height: 3rem;
	z-index: 1;
`;

const LogOut = styled.button`
	background-color: var(--red-incomplete);
	color: #fff;
	border-radius: var(--border-radius-2);
	border: none;
	height: 2rem;
	box-shadow: -2px 2px 3px rgba(0, 0, 0, 0.2);

	animation: slidein-horizontal 300ms ease-in;
	cursor: pointer;
`;
