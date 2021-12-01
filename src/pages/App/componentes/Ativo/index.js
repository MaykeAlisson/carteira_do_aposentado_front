import React, {useState} from "react";

import {
    Button,
    Dialog, DialogActions, DialogContent, DialogTitle,
    Fab,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import BarChartIcon from '@mui/icons-material/BarChart';
import AddIcon from '@mui/icons-material/Add';
import CadastroAtivo from "./components/CadastroAtivo";

const rows = [
    {
        nome: "ATivo1",
        tipo: 'Ação',
        categoria: 'By Road',
        porcentagem: 10,
        observacao: 'bla bla bla',
        quantidade: 10,
        total: 300,
        fundamentos: []
    },
    {
        nome: "ATivo1",
        tipo: 'Ação',
        categoria: 'By Road',
        porcentagem: 10,
        observacao: 'bla bla bla',
        quantidade: 10,
        total: 300,
        fundamentos: []
    },
    {
        nome: "ATivo1",
        tipo: 'Ação',
        categoria: 'By Road',
        porcentagem: 10,
        observacao: 'bla bla bla',
        quantidade: 10,
        total: 300,
        fundamentos: []
    },
    {
        nome: "ATivo1",
        tipo: 'Ação',
        categoria: 'By Road',
        porcentagem: 10,
        observacao: 'bla bla bla',
        quantidade: 10,
        total: 300,
        fundamentos: []
    },
    {
        nome: "ATivo1",
        tipo: 'Ação',
        categoria: 'By Road',
        porcentagem: 10,
        observacao: 'bla bla bla',
        quantidade: 10,
        total: 300,
        fundamentos: []
    },
];

const Componente = () => {

    const [newAtivo, setNewAtivo] = useState(false);
    const onReaload = () => {
        setNewAtivo(false);
        alert('Buscar ativos novamentes');
    }

    return (
        <>
            <TableContainer style={{marginTop: 10}} component={Paper}>
                <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ativo</TableCell>
                            <TableCell align="right">Tipo</TableCell>
                            <TableCell align="right">Categoria</TableCell>
                            <TableCell align="right">Porcentagem</TableCell>
                            <TableCell align="right">Quantidade</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">Observacao</TableCell>
                            <TableCell align="right">Editar</TableCell>
                            <TableCell align="right">Fundamentos</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.nome}
                                </TableCell>
                                <TableCell align="right">{row.tipo}</TableCell>
                                <TableCell align="right">{row.categoria}</TableCell>
                                <TableCell align="right">{row.porcentagem}</TableCell>
                                <TableCell align="right">{row.quantidade}</TableCell>
                                <TableCell align="right">{row.total}</TableCell>
                                <TableCell align="right">{row.observacao}</TableCell>
                                <TableCell align="right">
                                    <Button>
                                        <EditIcon/>
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button>
                                        <BarChartIcon/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Fab color="primary"
                 aria-label="add"
                 sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
            }}
                 onClick={() => {setNewAtivo(true)}}
            >
                <AddIcon/>
            </Fab>
            <CadastroAtivo open={newAtivo} onClose={() => {setNewAtivo(false)}} onReload={() => {onReaload()}}/>
        </>
    );

};

export default Componente;
