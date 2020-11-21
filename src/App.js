import React, { useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Header from './components/Header';
import Ideas from './components/Ideas';
import AuthModal from './components/AuthModal';
import { AuthContext } from './contexts/AuthContext';

const App = () => {
	const userInfo = useContext(AuthContext);

	const onDragEnd = result => {
		console.log(result);
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
