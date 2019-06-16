import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {withAxios} from 'react-axios';
import ReactMarkdown from 'react-markdown';
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import ScrollView from "../../../lib/components/scroll-view/ScrollView";
import backgroundImage from "../../../assets/shinku-horizontal-back.jpeg";
import {useTheme} from "@material-ui/styles";
import LoadingSnack from "../../../lib/components/loading-snack/LoadingSnack";
import "./refix-markdown-css.css";

const useStyles = makeStyles(theme => ({
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    toolbar: theme.mixins.toolbar,
    cardBackground: {
        margin: '16px 4vw',
        backgroundColor: 'rgb(255, 255, 255, 0.6)'
    },
    articleBackground: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

ArticleDialog.propTypes = {
    file: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    articles: PropTypes.array.isRequired,
};


function ArticleDialog(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = React.useState("");
    const [mainHeight, setMainHeight] = useState(0);
    const [snackOpen, setSnackOpen] = useState(false);

    useEffect(() => {
        setMainHeight(window.innerHeight);
    }, []);

    function handleClickOpen() {
        setSnackOpen(true);
        props.axios(`${process.env.PUBLIC_URL}/articles/${props.file}`).then(res => {
            setContent(res.data);
            setOpen(true);
            setSnackOpen(false);
        }).catch(error => {
            setSnackOpen(false)
        });
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <div>
            <div onClick={() => {handleClickOpen()}}>
                {props.children}
            </div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {props.title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.articleBackground} style={{height: mainHeight}}>
                    <div className={classes.toolbar}/>
                    <ScrollView height={mainHeight - theme.mixins.toolbar.minHeight }>
                        <Card classes={{root: classes.cardBackground}}>
                            <CardContent>
                                <ReactMarkdown source={content} className={"markdown"}/>
                            </CardContent>
                        </Card>
                    </ScrollView>
                </div>
            </Dialog>
            <LoadingSnack open={snackOpen}/>
        </div>
    );
}

export default withAxios(ArticleDialog)