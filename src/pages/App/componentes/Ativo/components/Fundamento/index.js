import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import isEmpty from "Util/isEmpty";

import {Api} from 'Services/api';
import CadastroFundamento from "./components/CadastroFundamento";
import AppContext from "Contexts/contexto";
import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';

const ativoService = Api.Ativo;

const Componente = () => {

    const navigate = useNavigate();
    const {ativoFundamento} = useContext(AppContext);
    const [ativo, setAtivo] = useState({...ativoFundamento});
    const [analise, setAnalise] = useState(isEmpty(ativoFundamento) ? [] : ativoFundamento.analise);
    const {setLoading} = useContext(LoadingContext);
    const {msgErro, msgAviso} = useContext(MessageContext);
    const [newFundamento, setNewFundamento] = useState(false);

    useEffect(() => {
        if (isEmpty(ativoFundamento)) navigate('/ativo');
        setAtivo({...ativoFundamento})
    }, [ativoFundamento]);

    useEffect(() => {
        setAnalise(ativo.analise);
    },[ativo])

    const onReloadAtivo = async (id) => {
        setNewFundamento(false);
        try {
            setLoading(true);
            const response = await ativoService.findById(id);
            console.log(response)
            if (isEmpty(response)) return;
            setAtivo({...response})
        } catch (e) {
            console.log(e);
            msgErro(e);
        } finally {
            setLoading(false);
        }
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
                    <section style={SectionRowStyle}>
                        <span style={SpanLabelStyle}>Nome:</span> <span style={SpanValueStyle}> {ativo.nome}</span>
                        <span style={SpanLabelStyle}>Tipo:</span> <span style={SpanValueStyle}> {ativo.tipo}</span>
                        <span style={SpanLabelStyle}>Categoria:</span> <span
                        style={SpanValueStyle}> {ativo.categoria}</span>
                        <span style={SpanLabelStyle}>Setor:</span> <span style={SpanValueStyle}> {ativo.setor}</span>
                        <span style={SpanLabelStyle}>Criação:</span> <span
                        style={SpanValueStyle}> {new Date(ativo.criacao).toLocaleString()}</span>
                    </section>
                    <section style={SectionRowStyle}>
                        <span style={SpanLabelStyle}>Qtd:</span> <span style={SpanValueStyle}> {ativo.qtd}</span>
                        <span style={SpanLabelStyle}>Valor:</span> <span style={SpanValueStyle}> {ativo.valor}</span>
                        <span style={SpanLabelStyle}>Porcentagem:</span> <span
                        style={SpanValueStyle}> {ativo.porcentagem}%</span>
                    </section>
                    <section style={SectionRowStyle}>
                        <span style={SpanLabelStyle}>Observação:</span> <span
                        style={SpanValueStyle}> {ativo.observacao}</span>
                    </section>
                </Paper>
                <div style={FundamentosStyle}>
                    {
                        analise.map((fundamento) => (
                            <Card key={`cd-${fundamento.mes}`} sx={{maxWidth: 320, marginBottom: 5}}>
                                <CardContent key={fundamento.mes} sx={FundamentosRowStyle}>
                                    <section key={`s1-${fundamento.mes}`}>
                                        <Typography key={`${fundamento.mes}-${fundamento.mes}`} sx={{fontSize: 14}}
                                                    color="text.secondary" gutterBottom>
                                            Mes: {fundamento.mes}
                                        </Typography>
                                        <Typography key={`${fundamento.mes}-${fundamento.pL}`} sx={{fontSize: 14}}
                                                    color="text.secondary" gutterBottom>
                                            PL: {fundamento.pL}
                                        </Typography>
                                        <Typography key={`${fundamento.mes}-${fundamento.pVPA}`} sx={{fontSize: 14}}
                                                    color="text.secondary" gutterBottom>
                                            Pv/Vp: {fundamento.pVPA}
                                        </Typography>
                                        <Typography key={`${fundamento.mes}-${fundamento.rOE}`} sx={{fontSize: 14}}
                                                    color="text.secondary" gutterBottom>
                                            ROE: {fundamento.rOE}
                                        </Typography>
                                    </section>
                                    <section key={`s2-${fundamento.mes}`}>
                                        <Typography key={`${fundamento.mes}-${fundamento.dY}`} sx={{fontSize: 14}}
                                                    color="text.secondary" gutterBottom>
                                            DY: {fundamento.dY}
                                        </Typography>
                                        <Typography key={`${fundamento.mes}-${fundamento.ebitda}`} sx={{fontSize: 14}}
                                                    color="text.secondary" gutterBottom>
                                            Ebitda: {fundamento.ebitda}
                                        </Typography>
                                        <Typography key={`${fundamento.mes}-${fundamento.dividaBrutaPatrimonioLiquido}`}
                                                    sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                            Dv/Pl: {fundamento.dividaBrutaPatrimonioLiquido}
                                        </Typography>
                                        <Typography key={`${fundamento.mes}-${fundamento.notaGovernanca}`}
                                                    sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                            Nota Gov.: {fundamento.notaGovernanca}
                                        </Typography>
                                    </section>
                                </CardContent>
                            </Card>
                        ))
                    }
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
                idAtivo={ativoFundamento.id}
                open={newFundamento}
                onClose={() => {
                    setNewFundamento(false)
                }}
                onReload={(id) => {
                    onReloadAtivo(id)
                }}
            />
        </>
    )
};

const SectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 20
};

const SectionRowStyle = {
    margin: '10px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
};

const SpanLabelStyle = {
    fontFamily: 'FreeMono',
};

const SpanValueStyle = {
    fontFamily: 'Comic Sans MS'
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
