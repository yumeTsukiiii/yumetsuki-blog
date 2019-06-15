import React from 'react';
import {Grid} from "@material-ui/core/index";
import Typography from "@material-ui/core/Typography/index";
import {makeStyles} from "@material-ui/styles/index";
import ChatIcon from "@material-ui/icons/Chat";

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.primary.main,
        boxShadow: '0px -2px 4px -1px rgba(0,0,0,0.2), 0px -4px 5px 0px rgba(0,0,0,0.14), 0px -1px 10px 0px rgba(0,0,0,0.12)',
        padding: "16px"
    }
}));

export default function Footer(props) {

    const classes = useStyles();

    return (
        <Grid container direction="row" justify="center" alignItems="center" classes={{root: classes.footer}}>
            <ChatIcon/>
            <div style={{margin: '0 8px'}}/>
            <Typography variant="h6">
                联系方式@QQ: 540160575
            </Typography>
        </Grid>
    );
}