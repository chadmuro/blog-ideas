import React, { useContext } from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { authLogout } from '../firebase/useAuth';
import { AuthContext } from '../contexts/AuthContext';

import Input from '../utils/Input';

const useStyles = makeStyles({
	appbar: {
		position: 'sticky',
	},
	navbar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
});

const Header = () => {
	const classes = useStyles();
	const { loading } = useContext(AuthContext);

	return (
		<>
			{!loading && (
				<AppBar className={classes.appbar}>
					<Toolbar className={classes.navbar}>
						<Input />
						<Button
							variant="contained"
							color="secondary"
							size="small"
							onClick={authLogout}
						>
							Log out
						</Button>
					</Toolbar>
				</AppBar>
			)}
		</>
	);
};

export default Header;
