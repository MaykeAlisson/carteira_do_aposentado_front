import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {
    Button,
    Fab,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import BarChartIcon from '@mui/icons-material/BarChart';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';

import { Api } from 'Services/api';
import AppContext from "Contexts/contexto";
import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';
import isEmpty from "Util/isEmpty";
import CadastroAtivo from "./components/CadastroAtivo";
import DialogObservacao from "./components/DialogObservacao";


const ativoService = Api.Ativo;

const Componente = () => {

    const {setAtivoObservable} = useContext(AppContext);
    const { setLoading } = useContext(LoadingContext);
    const { msgErro, msgAviso } = useContext(MessageContext);
    const [openObs, setOpenObs] = useState(false);
    const [newAtivo, setNewAtivo] = useState(false);
    const [updateAtivo, setUpdateAtivo] = useState(false);
    const [ativos, setAtivos] = useState([]);
    const [ativoUpdate, setAtivoUpdate] = useState({});
    const [textObs, setTextObs] = useState('');

    useEffect(() => {
        buscarAtivos();
    }, []);

    const buscarAtivos = async () => {
        try {
            setLoading(true);
            const response = await ativoService.findAll();
            if (isEmpty(response)) {
                // msgAviso('Não foi possivel concluir solicitação! Tente novamente!');
                return;
            }
            setAtivos(response)
        }catch (e) {
            console.log(e);
            msgErro(e.message)
        }finally {
            setLoading(false);
        }
    };
    const onReaload = () => {
        setNewAtivo(false);
        buscarAtivos();
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
                        {ativos.map((row) => (
                            <TableRow
                                key={`${row.nome}-${row.criacao}`}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.nome}
                                </TableCell>
                                <TableCell align="right">{row.tipo}</TableCell>
                                <TableCell align="right">{row.categoria}</TableCell>
                                <TableCell align="right">{row.porcentagem}</TableCell>
                                <TableCell align="right">{row.qtd}</TableCell>
                                <TableCell align="right">{(row.valor * row.qtd)}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => {setOpenObs(true); setTextObs(row.observacao)}}>
                                        <DescriptionIcon/>
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button onClick={()=> {setUpdateAtivo(true); setNewAtivo(true); setAtivoUpdate(row)}}>
                                        <EditIcon/>
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        style={{ textDecoration: 'none' }}
                                        component={Link}
                                        to={{ pathname: '/ativo/fundamento'}}
                                        onClick={() => {setAtivoObservable(row)}}
                                    >
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
                position: 'fixed',
                bottom: 16,
                right: 16,
            }}
                 onClick={() => {
                     setUpdateAtivo(false);
                     setNewAtivo(true)
                 }}
            >
                <AddIcon/>
            </Fab>
            <DialogObservacao openObs={openObs} onCloseObs={() => {setOpenObs(false)}} text={textObs}/>
            <CadastroAtivo
                open={newAtivo}
                onClose={() => {setNewAtivo(false)}}
                onReload={() => {onReaload()}}
                update={updateAtivo}
                ativoUpdate={ativoUpdate}
            />
        </>
    );

};

export default Componente;
