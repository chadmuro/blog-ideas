import React, { useContext } from 'react';

import { DragDropContext } from 'react-beautiful-dnd';
import Header from './components/Header';
import Ideas from './components/Ideas';
import AuthModal from './components/AuthModal';
import { AuthContext } from './contexts/AuthContext';
import { IdeasContext } from './contexts/IdeasContext';
import { MoveIdea } from './firebase/useFirestore';

const App = () => {
	const userInfo = useContext(AuthContext);
	const { ideas, setIdeas } = useContext(IdeasContext);

	const onDragEnd = result => {
		console.log(result);

		const { destination, source, draggableId } = result;
		if (!destination) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const newTaskList = ideas.map(idea => {
			return idea;
		});

		newTaskList.splice(source.index, 1);

		let newTimestamp;
		if (destination.index === 0) {
			newTimestamp = new Date(
				ideas[destination.index].createdAt.seconds * 1000 + 1000
			);
		} else if (destination.index === ideas.length - 1) {
			newTimestamp = new Date(
				ideas[destination.index].createdAt.seconds * 1000 - 1000
			);
		} else if (
			source.index < destination.index &&
			destination.index !== ideas.length - 1
		) {
			newTimestamp = new Date(
				(ideas[destination.index].createdAt.seconds * 1000 +
					ideas[destination.index + 1].createdAt.seconds * 1000) /
					2
			);
		} else if (source.index > destination.index && destination.index !== 0) {
			newTimestamp = new Date(
				(ideas[destination.index].createdAt.seconds * 1000 +
					ideas[destination.index - 1].createdAt.seconds * 1000) /
				2
			);
		}

		const newTask = {
			...ideas[source.index],
			createdAt: newTimestamp,
		};

		newTaskList.splice(destination.index, 0, newTask);

		MoveIdea(draggableId, newTask.createdAt);
		setIdeas(newTaskList);
	};

	return (
		<div className="App">
			{!userInfo && <AuthModal />}
			{userInfo && (
				<>
					<Header />
					<DragDropContext onDragEnd={onDragEnd}>
						<Ideas />
					</DragDropContext>
				</>
			)}
		</div>
	);
};

export default App;
