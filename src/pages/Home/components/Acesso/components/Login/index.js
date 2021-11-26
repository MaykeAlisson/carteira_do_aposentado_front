import React, {useContext, useState} from "react";
import {Button, Paper,Link, TextField, Typography} from "@mui/material";

import PropTypes from 'prop-types';

import { Api } from 'Services/api';
import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';
import isEmpty from "Util/isEmpty";
import TokenRepository from 'Repository/TokenRepository';
import SessionRepository from 'Repository/SessionRepository';

const segurancaService = Api.Seguranca;

const Page = ({trocarAcao, onAcessSuccess}) => {

    const { setLoading } = useContext(LoadingContext);
    const { msgErro, msgAviso } = useContext(MessageContext);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const fazerLogin = async () => {

        if (isEmpty(email)) return msgAviso('Email obrigatorio!');
        if (isEmpty(senha)) return msgAviso('Senha obrigatorio!');

        try {
            setLoading(true);
            const response = await segurancaService.login(email,senha);
            if (isEmpty(response)) {
                msgAviso('Não foi possivel concluir solicitação! Tente novamente!');
                return;
            }
            TokenRepository.set(response.token);
            SessionRepository.set(JSON.stringify(response));
            onAcessSuccess();
        }catch (e) {
            console.log(e);
            msgErro(e)
        }finally {
            setLoading(false);
        }
    };

    return (
        <div style={ContainerStyle}>
            <Paper sx={PaperStyle}>
                <Typography variant="h4" sx={TypografiaStyle}>Login</Typography>
                <TextField
                    id="login-email"
                    label="email"
                    type="email"
                    sx={InputStyle}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    id="login-senha"
                    label="senha"
                    type="password"
                    sx={InputStyle}
                    onChange={e => setSenha(e.target.value)}
                />
                <Button
                    color={"primary"}
                    variant="contained"
                    sx={ButtonStyle}
                    onClick={() => {fazerLogin()}}
                >
                    Entrar
                </Button>
                <Link href="#" underline="none">
                <span onClick={() => {trocarAcao()}}>Não tem conta? Cadastrar </span>
                </Link>
            </Paper>
        </div>
    );
};

Page.propType = {
    trocarAcao: PropTypes.func,
    onAcessSuccess: PropTypes.func
};

Page.defaultProps = {
    trocarAcao: () => {},
    onAcessSuccess: () => {}
};

// Styles

const ContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
};

const PaperStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px'
};

const TypografiaStyle = {
    textAlign: 'center'
};

const InputStyle = {
    margin: '10px',
};

const ButtonStyle = {
    margin: '10px',
};


export default Page;
