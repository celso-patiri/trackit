import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../../assets/img/logo.png';
import UserContext from '../../../context/UserContext';
import { Form, FormContainer, Input, Logo, StyledLink, StyledSubmit } from '../styledComponents';

const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login';

export default function Login() {
	const { userData, setUserData } = useContext(UserContext);

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
			<StyledLink to="/register">Don't have an account? Sign up</StyledLink>
		</FormContainer>
	);

	function handleInput(e) {
		const infoInput = e.target;
		userInfo[infoInput.name] = infoInput.value;
		setUserInfo({ ...userInfo });
	}

	function handleSubmit(e) {
		if (!userInfo.email || !userInfo.password) return;

		setIsProcessingRequest(true);
		axios
			.post(URL, userInfo)
			.then((res) => {
				setUserData(res.data);
				navigate('/habits');
			})
			.catch((err) => {
				setIsProcessingRequest(false);
				window.alert('pera la meu rei');
			});
	}
}
