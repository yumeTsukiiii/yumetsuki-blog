import React, {useEffect, useState} from 'react';
import BlogAppBar from "./components/BlogAppBar";
import makeStyles from "@material-ui/styles/makeStyles/index";
import {CssBaseline} from "@material-ui/core/index";
import backgroundImage from '../../assets/shinku-horizontal-back.jpeg'
import {useTheme} from "@material-ui/styles/index";
import Typography from "@material-ui/core/Typography/index";
import ScrollView from "../../lib/components/scroll-view/ScrollView"
import StyledSimpleCard from "../../lib/components/styled-simple-card/StyledSimpleCard";
import Button from "@material-ui/core/Button/index";
import Grid from "@material-ui/core/Grid/index";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"
import Footer from "./components/Footer";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    toolbarMargin: theme.mixins.toolbar,
    mainBackground: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    contentMargin: {
        paddingTop: '16vh',
        '@media (min-width: 475px)': {
            paddingTop: '24vh'
        }
    },
    title: {
        fontSize: '36px !important',
        textAlign: 'center'
    },
    mainTitle: {
        fontSize: '48px !important',
        textAlign: 'center',
        marginTop: '16px'
    },
    introItem: {
        margin: '8px'
    }
}));

export default function Main(props) {


    const classes = useStyles();
    const theme = useTheme();
    const [mainHeight, setMainHeight] = useState(0);
    const [scrollViewHeight, setScrollViewHeight] = useState(100);

    const introList = [
        {
            title: '我是谁？',
            content: '二阶堂梦月，现某高校二年生，一个活在遥远世界的梦里的普通男生，喜欢编程，吉他。'
        },
        {
            title: '背景和头像',
            content: '背景和头像出自Favorite作品《五彩斑斓的世界/曙光》、《你朱眸里的五彩世界》。这名少女名为二阶堂真红，半透明的魔法师，是名很温柔的少女。(尽管这张照片看上去不是这样)'
        },{
            title: '为什么用这样的背景和头像，你是死宅么？',
            content: '死宅怎么了？！死宅拯（hui）救（mie）世界！强调一遍！不是因为是死宅才用这样的背景和头像！是因为这个人很重要！很重要！很重要！'
        },{
            title: '关于本博客',
            content: '该博客为二阶堂梦月的个人博客，你可以在这里看到一些博主的个人信息，博主的个人动态，以及一些编程技术的手记等。'
        }
    ];

    useEffect(() => {
        setMainHeight(window.innerHeight);
        setScrollViewHeight(
            mainHeight -
            theme.mixins.toolbar.minHeight
        );
    }, [props, mainHeight, theme.mixins.toolbar.minHeight]);

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <BlogAppBar/>
            <div className={classes.toolbarMargin}/>
            <div className={classes.mainBackground}
                 style={{ height: mainHeight - theme.mixins.toolbar.minHeight }}>
                <ScrollView height={scrollViewHeight}>
                    <div id='content-margin-div' className={classes.contentMargin}/>
                    <Grid container direction="column"
                          alignItems="center">
                        <Typography variant="h6" className={classes.title}>
                            乌拉拉！
                        </Typography>
                        <div/>
                        <Typography variant="h6" className={classes.mainTitle}>
                            欢迎来到遥远世界的梦
                        </Typography>
                        <div style={{margin: '16px'}}>
                            <Button variant="contained" color="secondary"
                                onClick={() => { props.history.replace("/mine")} }>
                                前往梦月的世界
                            </Button>
                        </div>
                        <Typography variant="h6">
                            关于梦境主人
                        </Typography>
                        <div style={{margin: '8px'}}>
                            <ArrowDownwardIcon color="primary"/>
                        </div>
                    </Grid>
                    {
                        introList.map((item, index) => (
                            <StyledSimpleCard key={index} title={item.title} content={item.content}/>
                        ))
                    }
                    <Footer/>
                </ScrollView>
            </div>
        </div>
    );
}