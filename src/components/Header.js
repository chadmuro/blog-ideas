import React from 'react';
import {
	AppBar,
	Toolbar,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Input from '../utils/Input';

const useStyles = makeStyles({
	appbar: {
		position: 'sticky'
	},
    navbar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
})

const Header = () => {
    const classes = useStyles();

	return (
		<AppBar className={classes.appbar}>
			<Toolbar className={classes.navbar}>
				<Input />
                <Button variant="contained" color="secondary" size="small">Log out</Button>
			</Toolbar>
		</AppBar>
	);
};

export default Header;