import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 10vh;
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

	&::placeholder {
		color: var(--gray-light);
	}

	&.submit {
		color: var(--text-light);
		background-color: var(--blue-light);
		border: none;
	}
`;

const StyledLink = styled(Link)`
	color: var(--blue-dark);
	font-size: var(--font-size-1);
	margin-top: 5px;
	text-decoration: none;
`;

export { FormContainer, Input, Form, Logo, StyledLink };
