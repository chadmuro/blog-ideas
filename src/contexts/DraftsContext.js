import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebase/config';
import { AuthContext } from '../contexts/AuthContext';

export const DraftsContext = createContext();

const DraftsContextProvider = props => {
	const [drafts, setDrafts] = useState([]);
	const { userInfo, loading } = useContext(AuthContext);

	useEffect(() => {
		if (!loading) {
			const unsub = db
				.collection('drafts')
				.where('userId', '==', userInfo.uid)
				.orderBy('completed')
				.orderBy('createdAt', 'desc')
				.onSnapshot(
					snapshot => {
						let documents = [];
						snapshot.forEach(doc => {
							documents.push({ ...doc.data(), id: doc.id });
						});
						setDrafts(documents);
					},
					err => console.log(err)
				);
			return () => unsub();
		}
	}, [userInfo, loading]);

	return (
		<DraftsContext.Provider value={{ drafts, setDrafts }}>
			{props.children}
		</DraftsContext.Provider>
	);
};

export default DraftsContextProvider;
