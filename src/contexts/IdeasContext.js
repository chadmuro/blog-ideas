import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';

export const IdeasContext = createContext();

const IdeasContextProvider = props => { 
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
			const unsub = db
				.collection('ideas')
				.orderBy('completed')
				.orderBy('createdAt', 'desc')
				.onSnapshot(snapshot => {
					let documents = [];
					snapshot.forEach(doc => {
						documents.push({ ...doc.data(), id: doc.id });
					});
					setIdeas(documents);
				});
			return () => unsub();
		}, []);

    return (
        <IdeasContext.Provider value={{ideas, setIdeas}}>
            {props.children}
        </IdeasContext.Provider>
    )
}

export default IdeasContextProvider;
