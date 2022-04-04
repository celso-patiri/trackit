import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FormContainer = styled.main`
	margin-top: 10vh;
	background-color: #fff;
`;

const Logo = styled.img`
	width: clamp(100px, 60%, 300px);
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
`;

const StyledSubmit = styled.button`
	color: var(--text-light);
	background-color: var(--blue-light);
	font-size: var(--font-size-4);
	width: var(--input-width);
	height: var(--input-heigth);
	border: none;
	border-radius: var(--border-radius-1);

	cursor: pointer;
	box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.2);

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

const ErrorMessage = styled.p`
	color: var(--red-incomplete);
	margin: 1vh;
`;

const CheckBoxDiv = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	margin: 5px 0;
	font-size: 16px;
`;

export { FormContainer, Input, Form, StyledSubmit, Logo, StyledLink, ErrorMessage, CheckBoxDiv };
