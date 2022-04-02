import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import logoImg from '../../../assets/logo.png';
import UserContext from '../../../context/UserContext';
import { Form, FormContainer, Input, Logo, StyledLink, StyledSubmit } from '../styledComponents';

const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up';

export default function SignUp() {
	const { userData, navigate } = useContext(UserContext);

	const [userInfo, setUserInfo] = useState({});
	const [isProcessingRequest, setIsProcessingRequest] = useState(false);

	useEffect(() => {
		if (userData.token) navigate.current('/habits');
	}, [userData.token, navigate]);

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

	function handleInput(e) {
		const infoInput = e.target;
		userInfo[infoInput.name] = infoInput.value;
		setUserInfo({ ...userInfo });
	}

	function handleSubmit(e) {
		if (!userInfo.name || !userInfo.password || !userInfo.email || !userInfo.image) return;
		setIsProcessingRequest(true);
		axios
			.post(URL, userInfo)
			.then((res) => navigate.current('/'))
			.catch((err) => {
				setIsProcessingRequest(false);
				window.alert('Something went wrong');
			});
	}
}