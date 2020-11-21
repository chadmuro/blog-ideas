import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import LoginSignup from './LoginSignup';

const useStyles = makeStyles({
	container: {
		height: '100vh',
		width: '100vw',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const AuthModal = () => {
	const classes = useStyles();

	return (
		<Container className={classes.container}>
			<LoginSignup />
		</Container>
	);
};

export default AuthModal;
