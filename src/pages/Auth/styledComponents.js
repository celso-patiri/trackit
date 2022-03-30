import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FormContainer = styled.main`
	margin-top: 10vh;
	background-color: #fff;
`;

const Logo = styled.img`
	width: 60%;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

const Input = styled.input`
	font-size: var(--font-size-4);
	color: var(--gray-dark);
	width: var(--input-width);
	height: var(--input-heigth);
	border: var(--input-border);
	border-radius: var(--border-radius-1);
	padding: 5px;
	margin: 3px 0;

	&:disabled {
		background: var(--gray-light);
		color: var(--text-disabled);
	}

	&::placeholder {
		color: var(--gray-light);
	}

	/* &:focus {
		outline: 2px solid var(--blue-light);
		border: none;
	} */
`;

const StyledSubmit = styled.button`
	color: var(--text-light);
	background-color: var(--blue-light);
	font-size: var(--font-size-4);
	width: var(--input-width);
	height: var(--input-heigth);
	border: none;
	border-radius: var(--border-radius-1);

	&:disabled {
		opacity: 0.7;
	}

	div {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const StyledLink = styled(Link)`
	color: var(--blue-dark);
	font-size: var(--font-size-1);
	margin-top: 5px;
	text-decoration: none;
`;

export { FormContainer, Input, Form, StyledSubmit, Logo, StyledLink };
