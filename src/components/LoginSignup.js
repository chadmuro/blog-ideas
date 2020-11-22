import React, { useState } from 'react';
import { Typography, TextField, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { authLogin, authSignup } from '../firebase/useAuth';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		width: '70%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		marginBottom: '1rem'
	},
	link: {
		cursor: 'pointer',
	},
	button: {
		marginTop: '1rem',
	},
	text: {
		marginTop: '1rem',
	},
});

const LoginSignup = () => {
	const classes = useStyles();
	const [displayLogin, setDisplayLogin] = useState(true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	const handleFormSubmit = e => {
		e.preventDefault();

		if (displayLogin) {
			authLogin(email, password).then(() => {
				setEmail('');
				setPassword('');
				setError('');
			});
		} else {
			authSignup(email, password).then(() => {
				setEmail('');
				setPassword('');
				setError('');
			});
		}
	};

	const handleFormChange = () => {
		setDisplayLogin(!displayLogin);
		setEmail('');
		setPassword('');
		setError('');
	}

	return (
		<form className={classes.container} onSubmit={handleFormSubmit}>
			<Typography variant="h4" className={classes.title}>{displayLogin ? 'Login' : 'Sign Up'}</Typography>
			<TextField
				value={email}
				onChange={e => setEmail(e.target.value)}
				type="email"
				label="Email"
				fullWidth
				required
			/>
			<TextField
				value={password}
				onChange={e => setPassword(e.target.value)}
				type="password"
				label="Password"
				fullWidth
				required
			/>
			<Button
				type="submit"
				variant="contained"
				color="primary"
				className={classes.button}
				align="center"
			>
				{displayLogin ? 'Login' : 'Sign Up'}
			</Button>
			<Typography className={classes.text}>
				{displayLogin ? "Don't have an account?" : 'Already have an account?'}
				&nbsp;
				<Link
					className={classes.link}
					onClick={handleFormChange}
				>
					{displayLogin ? 'Sign Up' : 'Login'}
				</Link>
			</Typography>
			<Typography>{error}</Typography>
		</form>
	);
};

export default LoginSignup;
