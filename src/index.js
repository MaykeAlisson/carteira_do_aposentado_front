import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Routes from './routes';
import Home from "./pages/Home";
import {AppProvider} from 'Contexts/contexto';
import {LoadingProvider} from 'Contexts/loading';
import Loading from 'Components/CustomLoading';
import {MessageProvider} from 'Contexts/message';
import {ptBR} from "@mui/material/locale";

let theme = createTheme({
    palette: {
        primary: {
            main: '#363636'
        }
    },
    status: {
        danger: 'orange',
    },
}, ptBR);

ReactDOM.render(
    <BrowserRouter>
    <ThemeProvider theme={theme}>
            <LoadingProvider>
                <Loading>
                    <MessageProvider>
                        <AppProvider>
                            <Home/>
                        </AppProvider>
                    </MessageProvider>
                </Loading>
            </LoadingProvider>
            </ThemeProvider>
    </BrowserRouter>
    ,
    document.getElementById('app')
);
