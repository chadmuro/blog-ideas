import { db } from './config';

export const AddIdea = (idea, uid) => {
	db.collection(uid)
		.add({
			...idea,
		})
		.then(() => console.log('idea added'))
		.catch(err => console.log(err));
};

export const MoveIdea = (idea, uid, destination, date) => {
	db.collection(uid)
		.doc(idea)
		.update({
			createdAt: date,
			stage: destination,
		})
		.then(() => console.log('firestore updated'))
		.catch(err => console.log(err));
};

export const UpdateIdea = (idea, uid, updatedIdea) => {
	db.collection(uid)
		.doc(idea)
		.update({
			idea: updatedIdea,
		})
		.then(() => console.log('idea updated'))
		.catch(err => console.log(err));
};

export const DeleteIdea = (idea, uid) => {
	db.collection(uid).doc(idea).delete();
};
