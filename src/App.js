import { Route, Routes } from 'react-router-dom';
import Today from './pages/Today/Today';
import AppTheme from './styles/__theme';
import { UserProvider } from './context/UserContext';
import Register from './pages/Auth/Register/Register';
import Login from './pages/Auth/Login/Login';
import Habits from './pages/Habits/Habits';
import History from './pages/History/History';

function App() {
	return (
		<UserProvider>
			<div className="App">
				<AppTheme />
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/habits" element={<Habits />} />
					<Route path="/today" element={<Today />} />
					<Route path="/history" element={<History />} />
				</Routes>
			</div>
		</UserProvider>
	);
}

export default App;
