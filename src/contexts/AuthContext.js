import React, { createContext, useState } from 'react';
import { auth } from '../firebase/config';

export const AuthContext = createContext();

const AuthContextProvider = props => {
	const [userInfo, setUserInfo] = useState(null);

	auth.onAuthStateChanged(user => {
		if (user) {
			setUserInfo(user);
			console.log(user);
		} else {
			setUserInfo(null);
			console.log('not logged in');
		}
    });
    
    return (
        <AuthContext.Provider value={userInfo}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider;
