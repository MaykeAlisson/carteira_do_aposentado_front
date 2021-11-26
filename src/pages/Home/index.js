import React, { useEffect, useReducer} from 'react';
import { useNavigate } from 'react-router-dom';

import { isValidBrowser, getQueryString } from 'Util/Document';
import TokenRepository from 'Repository/TokenRepository';
import Message from 'Components/CustomMsg';
import { AppProvider } from 'Contexts/contexto';
import Acesso from './components/Acesso'
import TrocarSenha from './components/TrocarSenha'
import APP from '../App'


const initialState = {
    acesso: false,
    trocaSenha: false,
    app: false,
    navegadorInvalido: false,
    id: null,
    key: null,
};

const Page = () => {

    const navigate = useNavigate();
    const [acao, setAcao] = useReducer((state, action) => {
        switch (action.type) {
            case 'NAVEGADOR_INVALIDO':
                return { ...initialState, navegadorInvalido: true };
            case 'ACESSO':
                return { ...initialState, acesso: true };
            case 'TROCA_SENHA':
                return { ...initialState, ...{ ...action.payload, trocaSenha: true } };
            case 'APP':
                return { ...initialState, app: true };
            default:
                return state;
        }
    }, initialState);

    useEffect(() => {
        if (isValidBrowser()) {
            if (TokenRepository.isAuthenticated()) {
                setAcao({
                    type: 'APP'
                });
            } else {
                const { id, key } = getQueryString() || {};
                if (id && key) {
                    setAcao({
                        type: 'TROCA_SENHA',
                        payload: { idUsuario: parseInt(id, 10), key },
                    });
                } else {
                    setAcao({ type: 'ACESSO' });
                }
            }
        } else {
            setAcao({ type: 'NAVEGADOR_INVALIDO' });
        }
    }, []);

    return (
        <>
            {
                acao.acesso
                && (
                    <Acesso onAcessSuccess={() => {
                        navigate('/');
                        setAcao({ type: 'APP' });
                    }}/>
                )
            }

            {
                acao.trocaSenha
                && (
                    <TrocarSenha/>
                )
            }

            {
                acao.app
                && (
                    <AppProvider>
                        <APP
                            onLogout={() => setAcao({ type: 'acesso' })}
                        />
                    </AppProvider>
                )
            }

            {
                acao.navegadorInvalido
                && (
                   <h1>Navegador não e Compativel</h1>
                )
            }
            <Message/>
        </>
    );
};


export default Page;
