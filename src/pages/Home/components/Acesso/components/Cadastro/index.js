import React from "react";

import {Button, Link, Paper, TextField, Typography} from "@mui/material";
import PropTypes from 'prop-types';

import MessageContext from 'Contexts/message';
import isEmpty from "../../../../../../infra/util/isEmpty";

const Page = ({trocarAcao}) => {

    return(
        <div style={ContainerStyle}>
            <Paper sx={PaperStyle}>
                <Typography variant="h4" sx={TypografiaStyle}>Cadastro</Typography>
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