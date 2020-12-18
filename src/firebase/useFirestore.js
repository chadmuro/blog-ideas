import { db } from './config';


export const AddIdea = (idea, uid) => {
	db.collection(uid)
		.add({
			...idea,
		})
		.then(() => console.log('idea added'))
		.catch(err => console.log(err));
};

export const MoveIdea = (idea, destination, date) => {
	db.collection(destination)
		.doc(idea)
		.update({
			createdAt: date,
		})
		.then(() => console.log('firestore updated'))
		.catch(err => console.log(err));
};

export const DeleteIdea = (idea, uid) => {
	db.collection(uid).doc(idea).delete();
};

// export const ToggleCompleted = (idea, completed) => {
// 	db.collection('ideas').doc(idea).update({
// 		completed: !completed,
// 	});
// };
