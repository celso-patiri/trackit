import styled from 'styled-components';

export default function Header({ imgUrl }) {
	return (
		<StyledHeader>
			<h1>TrackIt</h1>
			<UserAvatar src={imgUrl} alt="user avatar" />
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
	cursor: pointer;

	h1 {
		font-size: var(--font-size-6);
		color: var(--text-light);
	}

	img {
	}
`;

const UserAvatar = styled.img`
	border-radius: 50%;
	width: 3rem;
	height: 3rem;
`;
