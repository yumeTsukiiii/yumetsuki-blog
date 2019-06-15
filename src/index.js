import React from 'react';
import ReactDOM from 'react-dom';
import MainRouter from './router/router';
import 'typeface-roboto';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber'
import blue from '@material-ui/core/colors/blue'

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

ReactDOM.render(<App/>, document.getElementById('root'));
