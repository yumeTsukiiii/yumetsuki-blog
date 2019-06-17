import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import Nanami from "../../assets/七海.jpg";
import Mayu from "../../assets/前辈.jpg";
import Chisaki from "../../assets/千咲.jpg";
import Mitsuki from "../../assets/羽月.jpg";
import Mitsukasa from "../../assets/锉刀.jpg";
import './yuzu-auth.css';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import SixStar from "../../assets/六芒星.png";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from "@material-ui/core/Button";
import NingNingConfirm from "../../assets/宁宁tip-confirm.jpg";
import NingNingError from "../../assets/宁宁tip-error.jpg";

const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'center',
        color: '#fff',
        margin: '4vh 2vw',
        fontSize: '2em'
    },
    background: {
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

export default function YuzuAuth(props) {

    const classes = useStyles();

    const correctIndex = 0;

    const [chosenIndex, setChosenIndex] = useState(null);

    const [confirmOpen, setConfirmOpen] = useState(false);

    const [errorOpen, setErrorOpen] = useState(false);

    const [cards, setCards] = useState([
        {
            src: Nanami,
            chosen: false,
            name: "七海"
        },
        {
            src: Mayu,
            chosen: false,
            name: "茉优前辈"
        },
        {
            src: Chisaki,
            chosen: false,
            name: "千咲"
        },
        {
            src: Mitsuki,
            chosen: false,
            name: "羽月"
        },
        {
            src: Mitsukasa,
            chosen: false,
            name: "锉刀"
        }
    ]);

    const [containerHeight, setContainerHeight] = useState(0);

    function updateCardChosen(index) {
        if (chosenIndex === index) {
            setConfirmOpen(true)
        } else {
            setChosenIndex(index);
            let newCards = [...cards];
            newCards.forEach((item, i) => {
                item.chosen = index === i;
            });
            setCards(newCards)
        }

    }

    function checkCard() {
        setConfirmOpen(false);
        if (correctIndex === chosenIndex) {
            document.getElementById("root-background").classList.add("background-rotate-scale");
            setTimeout(() => {
                document.getElementById("cover-background").classList.add("background-disappear");
                setTimeout(() => {
                    props.history.replace("/main")
                }, 3000)
            }, 1000)
        } else {
            setErrorOpen(true);
        }
    }

    useEffect(() => {
        setContainerHeight(window.innerHeight);
    }, []);

    return (
        <div style={{height: containerHeight, backgroundColor: '#000'}}>
            <div id="cover-background" style={{height: containerHeight, width: "100%"}} className="background-cover"/>
            <div id="root-background" style={{height: containerHeight}} className={classes.background}>
                <CssBaseline/>
                <img alt={"six-star"} src={SixStar} className={"star-image"}/>
                <Typography variant={"h4"} className={classes.title}>
                    不好好选择你的真爱是不会让你进去的！
                </Typography>
                <Grid container justify={"center"}>
                    {cards.map((item, index) => (
                        <Grid item sm key={index} xs={4}>
                            <img alt={`card-${index}`} src={item.src} onClick={() => {updateCardChosen(index)}}
                                 className={`image ${item.chosen ? 'image-chosen' : 'image-not-chosen'}`}/>
                        </Grid>
                    ))}
                </Grid>
            </div>
            <Dialog open={confirmOpen}>
                <DialogContent>
                    <img alt={"ningning-confirm"} src={NingNingConfirm} style={{maxWidth: '100%'}} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setConfirmOpen(false) }} color="secondary">
                        还没有！
                    </Button>
                    <Button onClick={() => { checkCard() }} color="secondary">
                        我永远喜欢{chosenIndex !== null ? cards[chosenIndex].name : "???"}!
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={errorOpen}>
                <DialogContent>
                    <img alt={"ningning-confirm"} src={NingNingError} style={{maxWidth: '100%'}} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setErrorOpen(false) }} color="secondary">
                        啧！
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}