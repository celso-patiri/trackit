import logoImg from '../../../assets/img/logo.png';
import { FormContainer, Logo, Input, StyledLink } from '../styles';

export default function Login() {
	return (
		<FormContainer>
			<Logo src={logoImg} alt="logo"></Logo>
			<Input type="text" placeholder="email" />
			<Input type="text" placeholder="password" />
			<Input className="submit" type="submit" value="Login" />
			<StyledLink to="/register">Don't have an account? Sign up</StyledLink>
		</FormContainer>
	);
}
