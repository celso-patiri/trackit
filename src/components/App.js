import { Route, Routes } from 'react-router-dom';
import Habits from './Habits/Habits';
import Today from './Today/Today';
import AppTheme from '../assets/styles/__theme';
import Register from './Auth/Register/Register';
import Login from './Auth/Login/Login';

function App() {
	return (
		<div className="App">
			<AppTheme />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/habits" element={<Habits />} />
				<Route path="/today" element={<Today />} />
			</Routes>
		</div>
	);
}

export default App;
