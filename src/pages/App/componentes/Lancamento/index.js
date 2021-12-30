import React, {useContext, useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {Api} from 'Services/api';
import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';
import isEmpty from "Util/isEmpty";

const INITIAL_STATE = {
    ativo: '',
    valor: 0,
    operacao: '',
    qtd: 0,
    data: '',
};

const lancamentoService = Api.Lancamento;

const Componente = () => {

    const {setLoading} = useContext(LoadingContext);
    const {msgErro, msgAviso, msgSucesso} = useContext(MessageContext);
    const [lancamentos, setLancamentos] = useState([]);
    const [lancamento, setLancamento] = useState({...INITIAL_STATE})
    const [openForm, setOpenForm] = useState(false);

    useEffect(() => {
        buscarLancamentos();
    }, [])

    const setValue = ({target}) => setLancamento({
        ...lancamento,
        [target.name]: target.value,
    });

    const buscarLancamentos = async() => {
        try {
            setLoading(true);
            const response = await lancamentoService.buscar();
            if (!isEmpty(response)) setLancamentos(response);
        }catch (e) {
            console.log(e);
            msgErro(e.message)
        }finally {
            setLoading(false);
        }
    }

    const save = async () => {
        if (isEmpty(lancamento.ativo)) return msgAviso('Ativo obrigatorio!');
        if (isEmpty(lancamento.valor) || lancamento.valor <= 0) return msgAviso('Valor obrigatorio!');
        if (isEmpty(lancamento.operacao)) return msgAviso('Operação obrigatorio!');
        if (isEmpty(lancamento.qtd) || lancamento.qtd <= 0) return msgAviso('Qtd obrigatorio!');
        if (isEmpty(lancamento.data)) return msgAviso('Data obrigatorio!');

        let dados = {...lancamento,
            qtd: Number(lancamento.qtd),
            valor: Number(lancamento.valor),
        }

        try {
            setLoading(true);
            await lancamentoService.create(dados);
            msgSucesso("Lancamento cadastrado!")
            setOpenForm(false);
            setLancamento({...INITIAL_STATE});
            buscarLancamentos();
        }catch (e) {
            console.log(e);
            msgErro(e.message)
        }finally {
            setLoading(false);
        }
    }

    return (
        <>
            <TableContainer style={{marginTop: 10}} component={Paper}>
                <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ativo</TableCell>
                            <TableCell align="right">Valor</TableCell>
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
                                <TableCell align="right">{row.valor}</TableCell>
                                <TableCell align="right">{row.operacao}</TableCell>
                                <TableCell align="right">{row.qtd}</TableCell>
                                <TableCell align="right">{row.data}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => {
                                    }}>
                                        <EditIcon/>
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => {
                                    }}>
                                        <DeleteIcon/>
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
                     setOpenForm(true);
                 }}
            >
                <AddIcon/>
            </Fab>
            <Dialog open={openForm}>
                <DialogTitle>Novo Lancamento</DialogTitle>
                <DialogContent>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
                        <div>
                            <TextField
                                name='ativo'
                                label="Ativo"
                                type="text"
                                value={lancamento.ativo}
                                onChange={setValue}
                            />
                        </div>
                        <div>
                            <TextField
                                name='valor'
                                label="Valor"
                                type="number"
                                value={lancamento.valor}
                                sx={InputNumberStyle}
                                onChange={setValue}
                            />
                        </div>
                        <div style={{display: 'flex', gap: 5}}>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">Operação</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='operacao'
                                    value={lancamento.operacao}
                                    label="Operação"
                                    onChange={setValue}
                                    sx={InputSelectStyle}
                                >
                                    <MenuItem value={'COMPRA'}>Compra</MenuItem>
                                    <MenuItem value={'VENDA'}>Venda</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                name='qtd'
                                label="Quantidade"
                                type="number"
                                value={lancamento.qtd}
                                sx={InputNumberStyle}
                                onChange={setValue}
                            />
                        </div>
                        <div>
                            <TextField
                                name='data'
                                label="Data"
                                type="date"
                                defaultValue="2022-01-01"
                                onChange={setValue}
                                sx={{width: 220}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpenForm(false)
                    }}>Sair</Button>
                    <Button onClick={() => {
                        save()
                    }}>Salvar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const InputNumberStyle = {
    maxWidth: 100
};

const InputSelectStyle = {
    width: 120,
    maxWidth: 120
};

export default Componente;
