import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import isEmpty from "Util/isEmpty";

import CadastroFundamento from "./components/CadastroFundamento";
import { Api } from 'Services/api';
import AppContext from "Contexts/contexto";
import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';

const Componente = () => {

    const navigate = useNavigate();
    const {ativoFundamento} = useContext(AppContext);
    const [ativo, setAtivo] = useState({...ativoFundamento});
    const { setLoading } = useContext(LoadingContext);
    const { msgErro, msgAviso } = useContext(MessageContext);
    const [newFundamento, setNewFundamento] = useState(false);

    useEffect(() => {
        if (isEmpty(ativoFundamento)) navigate('/ativo');
        setAtivo({...ativoFundamento})
    }, [ativoFundamento]);

    const onReloadAtivo = (id) => {
      alert("buscar ativo com id " + id)
    };

    return (
        <>
            <Button
                size="small"
                variant="contained"
                color="primary"
                style={{
                    textDecoration: 'none',
                    marginTop: '10px',
                    marginLeft: '20px',
                }}
                component={Link}
                to={{
                    pathname: '/ativo',
                    state: {prevPath: '/ativo/fundamento'},
                }}
            >
                VOLTAR
            </Button>
            <section style={SectionStyle}>
                <Paper elevation={3} sx={DetalhesStyle}>
                    <section>
                        <span>Nome: {ativo.nome}</span>
                        <span>Tipo: {ativo.tipo}</span>
                        <span>Categoria: {ativo.categoria}</span>
                        <span>Setor: {ativo.setor}</span>
                        <span>Criação: {ativo.criacao}</span>
                    </section>
                    <section>
                        <span>Qtd: {ativo.qtd}</span>
                        <span>Valor: {ativo.valor}</span>
                        <span>Porcentagem: {ativo.porcentagem}</span>
                        <span>Setor: {ativo.setor}</span>
                        <span>Criação: {ativo.criacao}</span>
                    </section>
                    <section>
                        <span>Observação: {ativo.observacao}</span>
                    </section>
                </Paper>
                <div style={FundamentosStyle}>
                    <Card sx={{maxWidth: 320, marginBottom: 5}}>
                        <CardContent sx={FundamentosRowStyle}>
                            <section>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                            </section>
                            <section>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                            </section>
                        </CardContent>
                    </Card>
                    <Card sx={{maxWidth: 320, marginBottom: 5}}>
                        <CardContent sx={FundamentosRowStyle}>
                            <section>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                            </section>
                            <section>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                            </section>
                        </CardContent>
                    </Card>
                    <Card sx={{maxWidth: 320, marginBottom: 5}}>
                        <CardContent sx={FundamentosRowStyle}>
                            <section>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                            </section>
                            <section>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                            </section>
                        </CardContent>
                    </Card>
                    <Card sx={{maxWidth: 320, marginBottom: 5}}>
                        <CardContent sx={FundamentosRowStyle}>
                            <section>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                            </section>
                            <section>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                            </section>
                        </CardContent>
                    </Card>
                    <Card sx={{maxWidth: 320, marginBottom: 5}}>
                        <CardContent sx={FundamentosRowStyle}>
                            <section>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                            </section>
                            <section>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                            </section>
                        </CardContent>
                    </Card>
                    <Card sx={{maxWidth: 320, marginBottom: 5}}>
                        <CardContent sx={FundamentosRowStyle}>
                            <section>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                            </section>
                            <section>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    adjective
                                </Typography>
                            </section>
                        </CardContent>
                    </Card>
                </div>
            </section>
            <Fab color="primary"
                 aria-label="add"
                 sx={{
                     position: 'fixed',
                     bottom: 16,
                     right: 16,
                 }}
                 onClick={() => {
                    setNewFundamento(true);
                 }}
            >
                <AddIcon/>
            </Fab>
            <CadastroFundamento
                open={newFundamento}
                onClose={() => {setNewFundamento(false)}}
                onReload={(id) => {onReloadAtivo(id)}}
            />
        </>
    )
};

const SectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 20
};

const DetalhesStyle = {
    marginTop: '10px',
    maxlength: 300,
};

const FundamentosStyle = {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 10
};

const FundamentosRowStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
};

export default Componente;
