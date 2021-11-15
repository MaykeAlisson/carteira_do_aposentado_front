import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {createContext} from 'react';

const AppContext = createContext({});


export const AppProvider = ({children}) => {

    const [itens, setItens] = useState(new Map());
    const [usuario, setUsuario] = useState({
        matricula: 151167,
        nome: 'Mayke Alisson'
    });

    const login = (email, senha) => {

        alert(`${email}/${senha}`)
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
