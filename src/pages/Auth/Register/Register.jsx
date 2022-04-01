import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../../assets/img/logo.png';
import UserContext from '../../../context/UserContext';
import { Form, FormContainer, Input, Logo, StyledLink, StyledSubmit } from '../styledComponents';

const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up';

export default function Register() {
	const { userData } = useContext(UserContext);

	const [userInfo, setUserInfo] = useState({});
	const [isProcessingRequest, setIsProcessingRequest] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (userData.token) navigate('/habits');
	});

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
		if (!userInfo.name || !userInfo.password || !userInfo.email || !userInfo.picture) return;

		setIsProcessingRequest(true);
		axios
			.post(URL, userInfo)
			.then(navigate('/'))
			.catch((err) => window.alert('pera la meu rei'))
			.finally(() => setIsProcessingRequest(false));
	}
}
