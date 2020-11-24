import React, { createContext, useState } from 'react';
import { auth } from '../firebase/config';

export const AuthContext = createContext();

const AuthContextProvider = props => {
	const [userInfo, setUserInfo] = useState({ uid: '' });
	const [loading, setLoading] = useState(true);

	auth.onAuthStateChanged(user => {
		if (user) {
			setUserInfo(user);
			setLoading(false);
		} else {
			setUserInfo(null);
			setLoading(true);
		}
	});

	return (
		<AuthContext.Provider value={{ userInfo, loading }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
