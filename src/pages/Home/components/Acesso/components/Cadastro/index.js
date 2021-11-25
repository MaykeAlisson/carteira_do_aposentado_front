import React, {useContext, useEffect, useState} from "react";

import {Button, Link, Paper, TextField, Typography} from "@mui/material";
import PropTypes from 'prop-types';

import MessageContext from 'Contexts/message';
import isEmpty from "Util/isEmpty";

const Page = ({trocarAcao, onAcessSuccess}) => {

    const { msgAviso } = useContext(MessageContext);
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    const fazerCadastro = () => {
        if (isEmpty(nome)) return msgAviso('Nome obrigatorio!');
        if (isEmpty(email)) return msgAviso('Email obrigatorio!');
        if (isEmpty(senha)) return msgAviso('Senha obrigatorio!');
        if (String(senha).length < 6) return msgAviso('Tamanho senha invalido (min 6)!');

        alert("envia form");

    };

    return(
        <div style={ContainerStyle}>
            <Paper sx={PaperStyle}>
                <Typography variant="h4" sx={TypografiaStyle}>Cadastro</Typography>
                <TextField
                    id="login-nome"
                    label="nome"
                    type="text"
                    sx={InputStyle}
                    onChange={e => setNome(e.target.value)}
                />
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
                        fazerCadastro()
                    }}
                >
                    Cadastrar
                </Button>
                <Link href="#" underline="none">
                <span onClick={() => {trocarAcao()}}>Já tem conta?  Login </span>
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
