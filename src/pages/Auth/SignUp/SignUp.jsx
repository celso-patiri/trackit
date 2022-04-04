import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import isEmail from 'validator/lib/isEmail';
import isURL from 'validator/lib/isURL';
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

const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up';

export default function SignUp() {
	const { userData, navigate } = useContext(UserContext);

	const [userInfo, setUserInfo] = useState({});
	const [isProcessingRequest, setIsProcessingRequest] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		if (userData.token) navigate.current('/today');
	}, [userData.token, navigate]);

	const handleInput = (e) => {
		const infoInput = e.target;
		userInfo[infoInput.name] = infoInput.value;
		setUserInfo({ ...userInfo });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!isEmail(userInfo.email)) return setErrorMessage('Invalid email');
		if (!userInfo.password) return setErrorMessage('Please insert a valid password');
		if (!userInfo.name) return setErrorMessage('Please insert a valid name');
		if (!userInfo.image || !isURL(userInfo.image))
			return setErrorMessage('Please insert valid image URL');

		setIsProcessingRequest(true);
		axios
			.post(URL, userInfo)
			.then(() => navigate.current('/'))
			.catch(() => {
				setIsProcessingRequest(false);
				window.alert('Something went wrong');
			});
	};

	return (
		<FormContainer>
			<Logo src={logoImg} alt="logo"></Logo>
			<Form>
				<Input
					placeholder="email"
					name="email"
					onChange={handleInput}
					type="text"
					disabled={isProcessingRequest}
					required
				/>
				<Input
					placeholder="password"
					name="password"
					onChange={handleInput}
					type="password"
					disabled={isProcessingRequest}
					required
				/>
				<Input
					placeholder="name"
					name="name"
					onChange={handleInput}
					type="text"
					disabled={isProcessingRequest}
					required
				/>
				<Input
					placeholder="picture"
					name="image"
					onChange={handleInput}
					type="url"
					disabled={isProcessingRequest}
					required
				/>

				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

				<StyledSubmit
					className="submit"
					onClick={handleSubmit}
					disabled={isProcessingRequest}
					required
				>
					{isProcessingRequest ? (
						<ThreeDots color="#FFF" height={80} width={80} />
					) : (
						'Sign Up'
					)}
				</StyledSubmit>
			</Form>

			{!isProcessingRequest && <StyledLink to="/">Have an account? Log in</StyledLink>}
		</FormContainer>
	);
}
