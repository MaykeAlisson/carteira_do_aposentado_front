import React, {useState} from "react";

import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import BarChartIcon from '@mui/icons-material/BarChart';

const rows = [
    {nome: "ATivo1", quantidade: 10, total: 300, fundamentos: []},
    {nome: "ATivo2", quantidade: 35, total: 200, fundamentos: []},
    {nome: "ATivo3", quantidade: 12, total: 265, fundamentos: []},
    {nome: "ATivo4", quantidade: 54, total: 985, fundamentos: []},
];

const Componente = () => {

    return(
        <TableContainer style={{marginTop: 10}} component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Ativo</TableCell>
                        <TableCell align="right">Quantidade</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Editar</TableCell>
                        <TableCell align="right">Fundamentos</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.nome}
                            </TableCell>
                            <TableCell align="right">{row.quantidade}</TableCell>
                            <TableCell align="right">{row.total}</TableCell>
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
    );

};

export default Componente;
