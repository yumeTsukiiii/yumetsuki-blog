import React from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/styles";
import Slide from '@material-ui/core/Slide';
import {SnackbarContent} from "@material-ui/core";

LoadingSnack.defaultProps = {
    open: false,
    message: "主人您要的订单稍等哦～",
};

const useStyles = makeStyles(theme => ({
    background: {
        backgroundColor: theme.palette.secondary.main
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    },
    progress: {
        color: 'white',
        marginRight: '8px'
    }
}));

export default function LoadingSnack(props) {

    const classes = useStyles();

    function TransitionUp(props) {
        return <Slide {...props} direction="up" />;
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            TransitionComponent={TransitionUp}
            open={props.open}>

            <SnackbarContent
                className={classes.background}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        <CircularProgress className={classes.progress} size={24}/>
                        {props.message}
                </span>
                }
            />

        </Snackbar>
    );

}