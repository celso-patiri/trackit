import { FormContainer, Logo, Form, Input, StyledLink } from '../styles';
import logoImg from '../../../assets/img/logo.png';
import { useState } from 'react';

export default function Register() {
	const [userInfo, setUserInfo] = useState({});
	console.log(userInfo);
	return (
		<FormContainer>
			<Logo src={logoImg} alt="logo"></Logo>
			<Form>
				<Input
					placeholder="email"
					name="email"
					onChange={handleInput}
					type="text"
					required
				/>
				<Input
					placeholder="password"
					name="password"
					onChange={handleInput}
					type="text"
					required
				/>
				<Input placeholder="name" name="name" onChange={handleInput} type="text" required />
				<Input
					placeholder="picture"
					name="picture"
					onChange={handleInput}
					type="text"
					required
				/>
				<Input value="Login" type="submit" className="submit" />
			</Form>
			<StyledLink to="/">Have an account? Log in</StyledLink>
		</FormContainer>
	);

	function handleInput(e) {
		const infoInput = e.target;
		userInfo[infoInput.name] = infoInput.value;
		setUserInfo({ ...userInfo });
	}
}
