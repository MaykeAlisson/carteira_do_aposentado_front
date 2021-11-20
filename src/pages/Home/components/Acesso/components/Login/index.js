import React, {useContext, useState} from "react";
import {Button, Paper,Link, TextField, Typography} from "@mui/material";

import PropTypes from 'prop-types';

import MessageContext from 'Contexts/message';
import isEmpty from "../../../../../../infra/util/isEmpty";

const Page = ({trocarAcao}) => {

    const { msgAviso } = useContext(MessageContext);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const fazerLogin = () => {

        if (isEmpty(email)) return msgAviso('Email obrigatorio!');
        if (isEmpty(senha)) return msgAviso('Senha obrigatorio!');

        alert(`${email}/${senha}`)

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
                    onClick={() => {
                        fazerLogin()
                    }}
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
    trocarAcao: PropTypes.func
};

Page.defaultProps = {
    trocarAcao: () => {}
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
