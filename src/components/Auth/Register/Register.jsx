import { FormContainer, Logo, Form, Input, StyledLink, StyledSubmit } from '../styles';
import logoImg from '../../../assets/img/logo.png';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up';

export default function Register() {
	const [userInfo, setUserInfo] = useState({});
	const [isProcessingRequest, setIsProcessingRequest] = useState(false);
	const navigate = useNavigate();

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
			<StyledLink to="/">Have an account? Log in</StyledLink>
		</FormContainer>
	);

	function handleInput(e) {
		const infoInput = e.target;
		userInfo[infoInput.name] = infoInput.value;
		setUserInfo({ ...userInfo });
	}

	function handleSubmit(e) {
		// e.preventDefault();

		if (!userInfo.name || !userInfo.password || !userInfo.email || !userInfo.picture) return;

		setIsProcessingRequest(true);
		axios
			.post(URL, userInfo)
			.then(navigate('/'))
			.catch((err) => window.alert('pera la meu rei'))
			.finally(() => setIsProcessingRequest(false));
	}
}
