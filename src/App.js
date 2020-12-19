import React, { useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Header from './components/Header';
import Ideas from './components/Ideas';
import Drafts from './components/Drafts';
import Published from './components/Published';
import AuthModal from './components/AuthModal';
import { AuthContext } from './contexts/AuthContext';
import { IdeasContext } from './contexts/IdeasContext';
import { MoveIdea } from './firebase/useFirestore';

const App = () => {
	const { userInfo } = useContext(AuthContext);
	const { ideas, setIdeas } = useContext(
		IdeasContext
	);

	const onDragEnd = result => {
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

		let start = source.droppableId;
		let end = destination.droppableId;

		if (start === end) {
			const newTaskList = ideas[start].map(idea => {
				return idea;
			});

			let newTimestamp;
			const destinationTimestamp = ideas[end][destination.index].createdAt;

			if (destination.index === 0) {
				newTimestamp = destinationTimestamp + 1000;
			}
			if (destination.index === ideas[end].length - 1) {
				// newTimestamp = (ideas[end].length - 1).createdAt - 1000;
				newTimestamp = destinationTimestamp - 1000;
			}

			if (
				source.index < destination.index &&
				destination.index < ideas[end].length - 1
			) {
				newTimestamp =
					Math.ceil(
						destinationTimestamp + ideas[end][destination.index + 1].createdAt
					) / 2;
			}

			if (source.index > destination.index && destination.index !== 0) {
				newTimestamp =
					Math.floor(
						destinationTimestamp + ideas[end][destination.index - 1].createdAt
					) / 2;
			}

			const newTask = {
				...ideas[start][source.index],
				createdAt: newTimestamp,
				stage: end,
			};

			newTaskList.splice(source.index, 1);
			newTaskList.splice(destination.index, 0, newTask);

			console.log(newTaskList);

			if(start === 'ideas') {
				setIdeas({
					...ideas,
					ideas: newTaskList,
				});
			}
			if(start === 'drafts') {
				setIdeas({
					...ideas,
					drafts: newTaskList,
				});
			}
			if(start === 'published') {
				setIdeas({
					...ideas,
					published: newTaskList,
				});
			}
			
			MoveIdea(
				draggableId,
				userInfo.uid,
				destination.droppableId,
				newTimestamp
			);
			
		} else {
			const startTaskList = ideas[start].map(idea => {
				return idea;
			});
			const endTaskList = ideas[end].map(idea => {
				return idea;
			});

			let newTimestamp;
			// const startTimestamp = ideas[start][source.index].createdAt;

			if(ideas[end].length === 0) {
				newTimestamp = ideas[start][source.index].createdAt;;
			} else {
				// const destinationTimestamp = ideas[end][destination.index].createdAt;
				if (destination.index === 0) {
					newTimestamp = ideas[end][destination.index].createdAt + 1000;
				}
				if (destination.index === ideas[end].length) {
					newTimestamp = ideas[end][destination.index - 1].createdAt - 1000;
				}

				if (
					destination.index !== ideas[end].length &&
					destination.index !== 0
				) {
					newTimestamp =
						Math.ceil(
							ideas[end][destination.index].createdAt +
								ideas[end][destination.index - 1].createdAt
						) / 2;
				}
			}


			const newTask = {
				...ideas[start][source.index],
				createdAt: newTimestamp,
				stage: end,
			};

			startTaskList.splice(source.index, 1);
			endTaskList.splice(destination.index, 0, newTask);

			if (start === 'ideas') {
				if (end === 'drafts') {
					setIdeas({
						...ideas,
						ideas: startTaskList,
						drafts: endTaskList
					});
				}
				if (end === 'published') {
					setIdeas({
						...ideas,
						ideas: startTaskList,
						published: endTaskList,
					});
				}	
			}
			if (start === 'drafts') {
				if (end === 'ideas') {
					setIdeas({
						...ideas,
						drafts: startTaskList,
						ideas: endTaskList,
					});
				}
				if (end === 'published') {
					setIdeas({
						...ideas,
						drafts: startTaskList,
						published: endTaskList,
					});
				}
			}
			if (start === 'published') {
				if (end === 'drafts') {
					setIdeas({
						...ideas,
						published: startTaskList,
						drafts: endTaskList,
					});
				}
				if (end === 'ideas') {
					setIdeas({
						...ideas,
						published: startTaskList,
						ideas: endTaskList,
					});
				}
			}

			MoveIdea(
				draggableId,
				userInfo.uid,
				destination.droppableId,
				newTimestamp
			);
		}
	};

	return (
		<div className="App">
			{!userInfo && <AuthModal />}
			{userInfo && (
				<>
					<Header />
					<DragDropContext onDragEnd={onDragEnd}>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<Ideas />
							<Drafts />
							<Published />
						</div>
					</DragDropContext>
				</>
			)}
		</div>
	);
};

export default App;
