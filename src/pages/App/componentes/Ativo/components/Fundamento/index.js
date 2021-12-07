import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";

import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AppContext from "Contexts/contexto";

const Componente = () => {

    const {ativoFundamento} = useContext(AppContext);

    const [ativo, setAtivo] = useState({...ativoFundamento});

    useEffect(() => {
        setAtivo({...ativoFundamento})
    }, [ativoFundamento])

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
                    <h3>Detalhes</h3>
                </Paper>
                <div style={FundamentosStyle}>
                <Card sx={{minWidth: 275}}>
                    <CardContent>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            adjective
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{minWidth: 275}}>
                    <CardContent>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            adjective
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{minWidth: 275}}>
                    <CardContent>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            adjective
                        </Typography>
                    </CardContent>
                </Card>
                </div>
            </section>
        </>
    )
};

const SectionStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20
};

const DetalhesStyle = {
    marginTop: '10px',
    flexGrow: 5
};

const FundamentosStyle = {
    marginTop: '10px',
    flexGrow: 1,
};

const FundamentosRowStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
};

export default Componente;
