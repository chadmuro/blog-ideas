import React, { useState, useContext } from 'react';
import { InputBase, fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import { AddIdea } from '../firebase/useFirestore';
import { AuthContext } from '../contexts/AuthContext';

const useStyles = makeStyles(theme => ({
	add: {
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		width: '70%',
        display: 'flex',
        alignItems: 'center',
	},
	addIcon: {
		padding: '1px',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 0, 1, 1),
	},
}));

const Input = () => {
	const classes = useStyles();
	const userInfo = useContext(AuthContext);
	const [ideaInput, setIdeaInput] = useState('');

    const onSubmit = (e) => {
		e.preventDefault();
		
		const idea = {
			idea: ideaInput,
			userId: userInfo.uid,
			createdAt: new Date(),
			completed: false
		}

		AddIdea(idea);
		setIdeaInput('');
    }

	return (
		<>
			<form className={classes.add} onSubmit={onSubmit}>
				<InputBase
					placeholder="Add idea…"
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
                    fullWidth
                    value={ideaInput}
                    onChange={(e) => setIdeaInput(e.target.value)}
				/>
				<AddIcon className={classes.addIcon} onClick={onSubmit}/>
			</form>
		</>
	);
};

export default Input;
