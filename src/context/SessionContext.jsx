import { createContext, useState } from 'react';

const SessionContext = createContext({});

export function SessionProvider({ children }) {
	const [sessionInfo, setSessionInfo] = useState({});

	return (
		<SessionContext.Provider
			value={{ sessionInfo: sessionInfo, setSessionInfo: setSessionInfo }}
		>
			{children}
		</SessionContext.Provider>
	);
}

export default SessionContext;
