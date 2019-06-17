import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import MainRouter from './router/router';
import 'typeface-roboto';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber'
import blue from '@material-ui/core/colors/blue'
import FavoriteIcon from '@material-ui/icons/Favorite';
import './index.css'

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: amber[300],
            contrastText: 'rgb(255, 82, 82)'
        },
        secondary: {
            main: blue[500]
        },
        background: {
            default: '#fff',
            paper: '#fff'
        },
        text: {
            primary: 'rgb(255, 82, 82, 0.8)',
            secondary: blue[300]
        }
    },
});

const App = () => (
    <ThemeProvider theme={theme}>
        <MainRouter/>
    </ThemeProvider>
);

const ClickEffectApp = function () {

    useEffect(() => {
        let effectIcon = document.getElementById("effect-icon");
        document.body.onclick = (e) => {
            effectIcon.classList.remove('click-effect');
            setTimeout(() => {
                effectIcon.classList.add('click-effect');
            }, 0);
            effectIcon.style.left = `${e.clientX - effectIcon.clientWidth / 2}px`;
            effectIcon.style.top = `${e.clientY - effectIcon.clientHeight / 2}px`;
        }
    }, []);

    return (
        <div>
            <FavoriteIcon id="effect-icon" className={"click-effect click-absolute"} color="primary.text"/>
            <App/>
        </div>
    );
};

ReactDOM.render(<ClickEffectApp/>, document.getElementById('root'));
