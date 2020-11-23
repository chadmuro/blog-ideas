import { db } from './config';

export const AddIdea = idea => {
	db.collection('ideas')
		.add({
			...idea,
		})
		.then(() => console.log('idea added'))
		.catch(err => console.log(err));
};

export const MoveIdea = (idea, date) => {
	db.collection('ideas')
		.doc(idea)
		.update({
			createdAt: date,
		})
		.then(() => console.log('firestore updated'))
		.catch(err => console.log(err));
};

export const DeleteIdea = idea => {
	db.collection('ideas').doc(idea).delete();
};

export const ToggleCompleted = (idea, completed) => {
	db.collection('ideas').doc(idea).update({
		completed: !completed,
	});
};
