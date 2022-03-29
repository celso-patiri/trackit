import { Route, Routes } from 'react-router-dom';
import Habits from './components/Habits/Habits';
import Today from './components/Today/Today';
import AppTheme from './assets/styles/__theme';
import Register from './components/Auth/Register/Register';
import Login from './components/Auth/Login/Login';
import History from './components/History/History';
import { SessionProvider } from './context/SessionContext';

function App() {
	return (
		<SessionProvider>
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
		</SessionProvider>
	);
}

export default App;
