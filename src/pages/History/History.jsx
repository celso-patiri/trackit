import { useContext } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import SessionContext from '../../context/SessionContext';

export default function History() {
	const { sessionInfo } = useContext(SessionContext);

	return (
		<main>
			<Header imgUrl={sessionInfo.image} />
			History page
			<Footer />
		</main>
	);
}
