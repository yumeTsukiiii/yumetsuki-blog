import React from 'react'
import {Card} from "@material-ui/core/index";
import CardHeader from "@material-ui/core/CardHeader/index";
import CardContent from "@material-ui/core/CardContent/index";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/styles/index";
import CardActionArea from "@material-ui/core/CardActionArea/index";
import CardActions from "@material-ui/core/CardActions";

const useStyles = makeStyles(theme => ({
    root: {
        margin: '8px 1vw',
        backgroundColor: 'rgb(255, 255, 255, 0.3)'
    },
    title: {
        color: theme.palette.text.secondary,
        fontSize: '34px',
        fontWeight: 400
    },
    content: {
        color: 'black',
        fontSize: '24px',
        fontWeight: 400
    }
}));

StyledSimpleCard.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
};

export default function StyledSimpleCard(props) {

    const classes = useStyles();

    return (
        <Card classes={{root: classes.root}}>
            <CardActionArea>
                <CardHeader title={props.title} classes={{title: classes.title}}/>
                <CardContent>
                    <div className={classes.content}>{props.content}</div>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {props.children}
            </CardActions>
        </Card>
    )
}