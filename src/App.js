import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Login from './pages/Auth/Login/Login';
import SignUp from './pages/Auth/SignUp/SignUp';
import Habits from './pages/Habits/Habits';
import History from './pages/History/History';
import Today from './pages/Today/Today';
import AppTheme from './styles/__theme';

function App() {
	return (
		<UserProvider>
			<div className="App">
				<AppTheme />
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/habits" element={<Habits />} />
					<Route path="/today" element={<Today />} />
					<Route path="/history" element={<History />} />
				</Routes>
			</div>
		</UserProvider>
	);
}

export default App;
