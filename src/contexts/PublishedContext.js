import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebase/config';
import { AuthContext } from '../contexts/AuthContext';

export const PublishedContext = createContext();

const PublishedContextProvider = props => {
	const [published, setPublished] = useState([]);
	const { userInfo, loading } = useContext(AuthContext);

	useEffect(() => {
		if (!loading) {
			const unsub = db
				.collection('published')
				.where('userId', '==', userInfo.uid)
				.orderBy('completed')
				.orderBy('createdAt', 'desc')
				.onSnapshot(
					snapshot => {
						let documents = [];
						snapshot.forEach(doc => {
							documents.push({ ...doc.data(), id: doc.id });
						});
						setPublished(documents);
					},
					err => console.log(err)
				);
			return () => unsub();
		}
	}, [userInfo, loading]);

	return (
		<PublishedContext.Provider value={{ published, setPublished }}>
			{props.children}
		</PublishedContext.Provider>
	);
};

export default PublishedContextProvider;
