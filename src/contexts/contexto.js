import React, {useContext} from 'react';
import {useState} from 'react';
import {createContext} from 'react';


import { Api } from 'Services/api';
import MessageContext from 'Contexts/message';
const AppContext = createContext({});

const segurancaService = Api.Seguranca;

export const AppProvider = ({children}) => {

    const { msgErro } = useContext(MessageContext);
    const [usuario, setUsuario] = useState({
        matricula: 151167,
        nome: 'Mayke Alisson'
    });

    return (
        <AppContext.Provider value={{
            usuario,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
