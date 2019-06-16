import React, {Fragment} from 'react';
import StyledSimpleCard from "../../lib/components/styled-simple-card/StyledSimpleCard";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/styles";
import MineBilibili from "../../assets/mine-bilibili.png";
import Grid from "@material-ui/core/Grid";


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
    },
    image: {
        maxWidth: '70%',
        height: 'auto'
    }
}));

function Bilibili(props) {

    const classes = useStyles();

    return (
        <Fragment>
            <StyledSimpleCard
                title="一个不出名的up主"
                content="up名称: 幻の梦月">
            </StyledSimpleCard>
            <StyledSimpleCard
                title="就算不出名，偶尔也是会发些视频的"
                content="主要视频类型：吉他指弹(偶尔会水点别的)">
            </StyledSimpleCard>
            <StyledSimpleCard
                title="请多多支持up主！"
                content="up联系方式：QQ 540160575">
            </StyledSimpleCard>
            <Card classes={{root: classes.root}}>
                <CardActionArea>
                    <CardHeader title="不去看看up的主页up就要不开心了！(嘟嘴)" classes={{title: classes.title}}/>
                    <CardContent>
                        <Grid container direction="column" alignItems="center">
                            <img alt="bilibili-img" src={MineBilibili} className={classes.image}/>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
            <div style={{marginBottom: '48px'}}/>
        </Fragment>
    );
}

export default Bilibili