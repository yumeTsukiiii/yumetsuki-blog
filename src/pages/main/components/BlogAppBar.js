import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import AppBar from '@material-ui/core/AppBar/index';
import Toolbar from '@material-ui/core/Toolbar/index';
import Typography from '@material-ui/core/Typography/index';
import Avatar from "@material-ui/core/Avatar/index";

const useStyles = makeStyles(theme => ({
    avatar: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}));

export default function BlogAppBar() {
    const classes = useStyles();

    return (
        <Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <Avatar alt="yumetsuki" src="https://avatars1.githubusercontent.com/u/39160707?s=400&u=bac06768a938221632caa8a270e6f60dd1e27d05&v=4" className={classes.avatar} />
                    <Typography variant="h6" className={classes.title}>
                        遥远世界的梦
                    </Typography>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
}