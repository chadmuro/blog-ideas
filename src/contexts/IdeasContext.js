import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebase/config';
import { AuthContext } from '../contexts/AuthContext';

export const IdeasContext = createContext();

const IdeasContextProvider = props => {
	const [ideas, setIdeas] = useState({
		ideas: [],
		drafts: [],
		published: []
	});

	const { userInfo, loading } = useContext(AuthContext);

	useEffect(() => {
		if (!loading && userInfo) {
			const unsub = db
				.collection(userInfo.uid)
				.orderBy('createdAt', 'desc')
				.onSnapshot(
					snapshot => {
						let ideasDocuments = [];
						let draftsDocuments = [];
						let publishedDocuments = [];
						snapshot.forEach(doc => {
							switch (doc.data().stage) {
								case 'ideas':
									ideasDocuments.push({ ...doc.data(), id: doc.id });
									break;
								case 'drafts':
									draftsDocuments.push({ ...doc.data(), id: doc.id });
									break;
								case 'published':
									publishedDocuments.push({ ...doc.data(), id: doc.id });
									break;
								default: 
									return;
							}
						});
						setIdeas({
							ideas: ideasDocuments,
							drafts: draftsDocuments,
							published: publishedDocuments
						});
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
