import React, { useState } from "react";
import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';


const Componente = () => {

    const [lancamentos, setLancamentos] = useState([]);

    return(
        <>
            <TableContainer style={{marginTop: 10}} component={Paper}>
                <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ativo</TableCell>
                            <TableCell align="right">Operação</TableCell>
                            <TableCell align="right">Quantidade</TableCell>
                            <TableCell align="right">Data</TableCell>
                            <TableCell align="right">Editar</TableCell>
                            <TableCell align="right">Deletar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lancamentos.map((row) => (
                            <TableRow
                                key={`${row.ativo}-${row.data}`}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.ativo}
                                </TableCell>
                                <TableCell align="right">{row.operacao}</TableCell>
                                <TableCell align="right">{row.qtd}</TableCell>
                                <TableCell align="right">{row.data}</TableCell>                        
                                <TableCell align="right">
                                    <Button onClick={() => {}}>
                                        <EditIcon/>
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button onClick={()=> {}}>
                                        <EditIcon/>
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
                     position: 'fixed',
                     bottom: 16,
                     right: 16,
                 }}
                 onClick={() => {

                 }}
            >
                <AddIcon/>
            </Fab>
        </>
    );
};

export default Componente;
