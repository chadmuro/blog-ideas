import { useEffect, useState } from 'react';
import { db } from './config';

export const GetIdeas = () => {
	const [ideas, setIdeas] = useState([]);

	useEffect(() => {
		const unsub = db
			.collection('ideas')
			.orderBy('completed')
			.onSnapshot(snapshot => {
				let documents = [];
				snapshot.forEach(doc => {
					documents.push({ ...doc.data(), id: doc.id });
				});
				setIdeas(documents);
			});
		return () => unsub();
	}, []);
	return { ideas };
};

export const AddIdea = idea => {
	db.collection('ideas')
		.add({
			...idea,
		})
		.then(() => console.log('idea added'))
		.catch(err => console.log(err));
};

export const DeleteIdea = idea => {
    db.collection('ideas').doc(idea).delete();
}

export const ToggleCompleted = (idea, completed) => {
    db.collection('ideas').doc(idea).update({
        completed: !completed
    })
}