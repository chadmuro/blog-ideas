import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebase/config';
import { AuthContext } from '../contexts/AuthContext';

export const IdeasContext = createContext();

const IdeasContextProvider = props => {
	const [ideas, setIdeas] = useState([]);
	const { userInfo } = useContext(AuthContext);

	useEffect(() => {
		const unsub = db
			.collection('ideas')
			.where('userId', '==', userInfo ? userInfo.uid : '')
			.orderBy('completed')
			.orderBy('createdAt', 'desc')
			.onSnapshot(
				snapshot => {
					let documents = [];
					snapshot.forEach(doc => {
						documents.push({ ...doc.data(), id: doc.id });
					});
					setIdeas(documents);
				},
				err => console.log(err)
			);
		return () => unsub();
	}, [userInfo]);

	return (
		<IdeasContext.Provider value={{ ideas, setIdeas }}>
			{props.children}
		</IdeasContext.Provider>
	);
};

export default IdeasContextProvider;
