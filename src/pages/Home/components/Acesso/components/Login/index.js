import React from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";

const Page = () => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const fazerLogin = () => {

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
                   onClick={() => {fazerLogin}}
                   >
                       Entrar
                       </Button>
            </Paper>
        </div>
    );
};

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
