import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebase/config';
import { AuthContext } from '../contexts/AuthContext';

export const IdeasContext = createContext();

const IdeasContextProvider = props => {
	const [ideas, setIdeas] = useState([]);
	const { userInfo, loading } = useContext(AuthContext);

	useEffect(() => {
		if (!loading) {
			const unsub = db
				.collection('ideas')
				.where('userId', '==', userInfo.uid)
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
		}
	}, [userInfo, loading]);

	return (
		<IdeasContext.Provider value={{ ideas, setIdeas }}>
			{props.children}
		</IdeasContext.Provider>
	);
};

export default IdeasContextProvider;
