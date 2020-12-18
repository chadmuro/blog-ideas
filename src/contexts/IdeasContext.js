import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebase/config';
import { AuthContext } from '../contexts/AuthContext';

export const IdeasContext = createContext();

const IdeasContextProvider = props => {
	const [ideas, setIdeas] = useState([]);
	const [drafts, setDrafts] = useState([]);
	const [published, setPublished] = useState([]);
	const { userInfo, loading } = useContext(AuthContext);

	useEffect(() => {
		if (!loading) {
			const unsub = db
				.collection(userInfo.uid)
				// .where('userId', '==', userInfo.uid)
				// .orderBy('completed')
				.orderBy('createdAt', 'desc')
				.onSnapshot(
					snapshot => {
						let ideasDocuments = [];
						let draftsDocuments = [];
						let publishedDocuments = [];
						snapshot.forEach(doc => {
							switch (doc.data().stage) {
								case 'idea':
									ideasDocuments.push({ ...doc.data(), id: doc.id });
									break;
								case 'draft':
									draftsDocuments.push({ ...doc.data(), id: doc.id });
									break;
								case 'published':
									publishedDocuments.push({ ...doc.data(), id: doc.id });
									break;
								default: 
									return;
							}
						});
						setIdeas(ideasDocuments);
						setDrafts(draftsDocuments);
						setPublished(publishedDocuments);
					},
					err => console.log(err)
				);
			return () => unsub();
		}
	}, [userInfo, loading]);

	console.log(ideas, drafts, published);

	return (
		<IdeasContext.Provider value={{ ideas, setIdeas, drafts, setDrafts, published, setPublished }}>
			{props.children}
		</IdeasContext.Provider>
	);
};

export default IdeasContextProvider;
