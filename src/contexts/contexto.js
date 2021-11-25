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

    const login = async (email, senha) => {
        try {
            const response = await segurancaService.login(email,senha);
        }catch (e) {
            console.log(e);
        }
    };

    return (
        <AppContext.Provider value={{
            usuario,
            login
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
