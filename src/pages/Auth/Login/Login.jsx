import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import isEmail from 'validator/lib/isEmail';
import logoImg from '../../../assets/logo.png';
import UserContext from '../../../context/UserContext';
import {
	ErrorMessage,
	Form,
	FormContainer,
	Input,
	Logo,
	StyledLink,
	StyledSubmit,
} from '../styledComponents';

const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login';

export default function Login() {
	const { userData, logUserIn, navigate } = useContext(UserContext);

	const [userInfo, setUserInfo] = useState({});
	const [isProcessingRequest, setIsProcessingRequest] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		if (userData.token) navigate.current('/habits');
	}, [userData.token, navigate]);

	return (
		<FormContainer>
			<Logo src={logoImg} alt="logo"></Logo>
			<Form>
				<Input
					name="email"
					type="text"
					placeholder="email"
					onChange={handleInput}
					disabled={isProcessingRequest}
					required
				/>
				<Input
					name="password"
					type="password"
					placeholder="password"
					onChange={handleInput}
					disabled={isProcessingRequest}
					required
				/>

				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

				<StyledSubmit
					className="submit"
					type="submit"
					onClick={handleSubmit}
					disabled={isProcessingRequest}
				>
					{isProcessingRequest ? (
						<ThreeDots color="#FFF" height={80} width={80} />
					) : (
						'Login'
					)}
				</StyledSubmit>
			</Form>

			{!isProcessingRequest && (
				<StyledLink to="/signup">Don't have an account? Sign up</StyledLink>
			)}
		</FormContainer>
	);

	function handleInput(e) {
		const infoInput = e.target;
		userInfo[infoInput.name] = infoInput.value;
		setUserInfo({ ...userInfo });
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (!isEmail(userInfo.email)) return setErrorMessage('Invalid email');
		if (!userInfo.password) return setErrorMessage('Please insert password');

		setIsProcessingRequest(true);
		axios
			.post(URL, userInfo)
			.then(({ data }) => logUserIn(data))
			.catch((err) => {
				setIsProcessingRequest(false);
				window.alert('Invalid credentials');
			});
	}
}
