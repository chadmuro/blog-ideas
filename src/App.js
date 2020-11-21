import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Header from './components/Header';
import Ideas from './components/Ideas';
import AuthModal from './components/AuthModal';

const App = () => {
  const onDragEnd = result => {
    console.log(result);
  }

	return (
		<div className="App">
			<AuthModal />
			<Header />
			<DragDropContext onDragEnd={onDragEnd}>
				<Ideas />
			</DragDropContext>
		</div>
	);
};

export default App;
