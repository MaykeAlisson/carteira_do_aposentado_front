import React, {useContext} from 'react';
import {useState} from 'react';
import {createContext} from 'react';

import MessageContext from 'Contexts/message';
import SessionRepository from 'Repository/SessionRepository';

const AppContext = createContext({});

export const AppProvider = ({children}) => {

    const { msgErro } = useContext(MessageContext);
    const [usuario, setUsuario] = useState(JSON.parse(SessionRepository.get()));

    return (
        <AppContext.Provider value={{
            usuario,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
