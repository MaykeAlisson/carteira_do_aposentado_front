import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MessageContext from 'Contexts/message';

export default () => (
    <MessageContext.Consumer>{(context) => {
        const {state,msgClose} = context;
        return (
            <Snackbar
                open={state.open}
                autoHideDuration={9000}
                onClose={msgClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            >
                <MuiAlert
                    elevation={6}
                    variant='filled'
                    onClose={msgClose}
                    severity={state.severity}
                >
                    {state.texto}
                </MuiAlert>
            </Snackbar>
        );
    }}</MessageContext.Consumer>
);
