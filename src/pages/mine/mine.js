import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar/index';
import CssBaseline from '@material-ui/core/CssBaseline/index';
import Divider from '@material-ui/core/Divider/index';
import Drawer from '@material-ui/core/Drawer/index';
import Hidden from '@material-ui/core/Hidden/index';
import IconButton from '@material-ui/core/IconButton/index';
import BookIcon from '@material-ui/icons/Book';
import RadioIcon from '@material-ui/icons/Radio';
import AssignmentIcon from '@material-ui/icons/Assessment';
import HomeIcon from '@material-ui/icons/Home';
import List from '@material-ui/core/List/index';
import ListItem from '@material-ui/core/ListItem/index';
import ListItemIcon from '@material-ui/core/ListItemIcon/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import Toolbar from '@material-ui/core/Toolbar/index';
import Typography from '@material-ui/core/Typography/index';
import { makeStyles, useTheme } from '@material-ui/core/styles/index';
import Avatar from "@material-ui/core/Avatar/index";
import backgroundImage from "../../assets/shinku-horizontal-back.jpeg";
import {Grid} from "@material-ui/core/index";
import ScrollView from "../../lib/components/scroll-view/ScrollView";
import {Route}from "react-router-dom";
import Article from "../article/article";
import SimpleAudio from "../../lib/components/simple-audio/SimpleAudio";
import News from "../news/News";
import Bilibili from "../bilibili/Bilibili";
import Fab from "@material-ui/core/Fab";
import GithubImg from '../../assets/github.jpg';
import BilibiliImage from '../../assets/bilibili-icon.jpeg'
import Tooltip from "@material-ui/core/Tooltip";
import YukiNormal from "../../assets/CHR_幸_基_私服-transparent-normal.png"
import YukiThink from "../../assets/CHR_幸_基_私服-transparent-think.png"
import YukiSmail from "../../assets/CHR_幸_基_私服-transparent-smail.png"
import './mine.css'
import {getElementPageLeft, getElementPageTop, randomFrom} from "../../util/utils";

Mine.propTypes = {
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
};

const drawerWidth = 275;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "rgb(255, 255, 255, 0.8)"
    },
    drawerHeader: {
        minHeight: '24vh',
        backgroundColor: 'rgb(239, 83, 80)'
    },
    drawerNavItem: {
        color: theme.palette.text.primary
    },
    content: {
        flexGrow: 1,
        margin: theme.spacing(3),
    },
    title: {
        flexGrow: 1,
        minWidth: '45%'
    },
    musicName: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    fab: {
        position: 'absolute',
        bottom: 36,
        right: 36
    }
}));

export default function Mine(props) {

    const music = {
        src: `${process.env.PUBLIC_URL}/Riryka - 君だけの僕.mp3`,
        name: 'Riryka - 君だけの僕'
    };
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [mainHeight, setMainHeight] = useState(0);

    const yukiMessage = [
        {
            text: '梦月君每天都要写好多好多代码，看着他那样辛苦，却又帮不上什么忙，总觉得自己该做点什么。。。',
            img: YukiThink
        },
        {
            text: '听我说听我说，梦月君他，今天也和我说了好多好多话呢！',
            img: YukiSmail
        },
        {
            text: '你好啊，是来找梦月君玩的吗？',
            img: YukiNormal
        }
    ];

    const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);

    const drawerNavList = [
        {
            icon: <BookIcon/>,
            name: '编程手记',
            onClick: () => {
                props.history.replace("/mine/article");
            }
        },
        {
            icon: <RadioIcon/>,
            name: '梦月的b站信息',
            onClick: () => {
                props.history.replace('/mine/bilibili')
            }
        },
        {
            icon: <AssignmentIcon/>,
            name: '最新动态',
            onClick: () => {
                props.history.replace('/mine/news')
            }
        },
        {
            icon: <HomeIcon/>,
            name: '返回主页',
            onClick: () => {
                props.history.replace("/main");
            }
        }
    ];

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    useEffect(() => {
        if (window.innerWidth >= 480) {
            calculateChatPosition();
        }
        setMainHeight(window.innerHeight);
    }, []);

    /**
     * 计算白羽幸对话框的位置
     * */
    const calculateChatPosition = () => {
        let yuki = document.getElementById('yuki');
        let leftPostion = getElementPageLeft(yuki);
        let topPosition = getElementPageTop(yuki);
        let yukiChat = document.getElementById('yuki-chat');
        yukiChat.style.right = window.innerWidth - leftPostion + 64 + yukiChat.offsetWidth * 0.4 + 'px';
        yukiChat.style.bottom = window.innerHeight - topPosition + yukiChat.offsetHeight + 'px';
    };

    /**
     * 点击白羽幸触发对话
     * */
    const yukiClick = () => {
        if (currentMessageIndex >= 0) return;
        setCurrentMessageIndex(randomFrom(0, yukiMessage.length - 1));
        let yukiChat = document.getElementById('yuki-chat');
        yukiChat.classList.remove('yuki-chat-hide');
        yukiChat.classList.add('yuki-chat-show');
        setTimeout(() => {
            setCurrentMessageIndex(-1);
            yukiChat.classList.remove('yuki-chat-show');
            yukiChat.classList.add('yuki-chat-hide');
        }, 3000);
    };

    const drawer = (
        <div>
            <Grid container direction="column" alignItems="center"
                  justify="center"
                  className={classes.drawerHeader}>
                <Avatar alt="yumetsuki" style={{width: '64px', height: '64px'}}
                        src="https://avatars1.githubusercontent.com/u/39160707?s=400&u=bac06768a938221632caa8a270e6f60dd1e27d05&v=4"/>
                <div style={{margin: '8px'}}/>
                <Typography variant="h6" style={{color: "white"}}>
                    二阶堂梦月
                </Typography>
            </Grid>
            <Divider />
            <List>
                {drawerNavList.map(item => (
                    <ListItem button key={item.name} onClick={() => { item.onClick(); if (mobileOpen) setMobileOpen(false);}}>
                        <ListItemIcon classes={{root: classes.drawerNavItem}}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div className={classes.root} style={{height: mainHeight}}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}>
                        <Avatar alt="yumetsuki" src="https://avatars1.githubusercontent.com/u/39160707?s=400&u=bac06768a938221632caa8a270e6f60dd1e27d05&v=4"/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        遥远世界的梦
                    </Typography>
                    <Typography variant="subtitle2" className={classes.musicName} noWrap>
                        {music.name}
                    </Typography>
                    <SimpleAudio autoPlay
                        src={music.src}/>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="Mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}>
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open>
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <ScrollView height={mainHeight - theme.mixins.toolbar.minHeight}>
                    <Route exact path="/mine" component={Article}/>
                    <Route path="/mine/article" component={Article}/>
                    <Route path="/mine/news" component={News}/>
                    <Route path="/mine/bilibili" component={Bilibili}/>
                </ScrollView>
            </div>

            {/**yuki对话框*/}
            <div id={'yuki-chat'}
                 className={'yuki-chat-container'}>
                <div className={'yuki-chat-card'}>
                    <Typography
                        variant={"subtitle1"}
                        style={{wordBreak: 'break-word', padding: '4px 8px'}}>
                        {
                            currentMessageIndex >= 0 ?
                                yukiMessage[currentMessageIndex].text: ''
                        }
                    </Typography>
                </div>
                <div className={'yuki-chat-bubble-container'}>
                    <div className={'yuki-chat-bubble-2'}/>
                    <div className={'yuki-chat-bubble-1'}/>
                    <div className={'yuki-chat-bubble-0'}/>
                </div>
            </div>

            {
                (() => {
                   if (window.innerWidth < 480) {
                       return (
                           <a href="https://github.com/yumeTsukiiii"
                              className={classes.fab}
                              target="_Black" >
                               <Tooltip title="梦月的github地址">
                                   <Fab color='secondary' aria-label="Add">
                                       <Avatar src={GithubImg}/>
                                   </Fab>
                               </Tooltip>
                           </a>
                       )
                   } else {
                       /**yuki立绘*/
                       return (
                           <div id={'yuki'} className={`${classes.fab} yuki-hover`}>
                               <Grid direction={"column"}
                                     container
                                     spacing={2}
                                     style={{position: 'absolute'}}>
                                   <Grid item>
                                       <a href="https://github.com/yumeTsukiiii"
                                          className={'yuki-item-hover-0'}
                                          target="_Black" >
                                           <Tooltip title="梦月的github地址">
                                               <Fab color='secondary' aria-label="Add">
                                                   <Avatar src={GithubImg}/>
                                               </Fab>
                                           </Tooltip>
                                       </a>
                                   </Grid>
                                   <Grid item>
                                       <a href="https://space.bilibili.com/35748208"
                                          className={'yuki-item-hover-1'}
                                          target="_Black" >
                                           <Tooltip title="梦月的bilibili空间">
                                               <Fab color='secondary' aria-label="Add">
                                                   <Avatar src={BilibiliImage}/>
                                               </Fab>
                                           </Tooltip>
                                       </a>
                                   </Grid>
                               </Grid>
                               <img src={
                                   currentMessageIndex >= 0 ? yukiMessage[currentMessageIndex].img
                                       : YukiNormal
                               }
                                    onClick={yukiClick}/>
                           </div>
                       )
                   }
                })()
            }

        </div>
    );
}