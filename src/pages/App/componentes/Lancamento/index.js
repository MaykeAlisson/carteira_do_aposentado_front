import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab, FormControl, InputLabel, MenuItem,
    Paper, Select,
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


const Componente = () => {

    const [lancamentos, setLancamentos] = useState([]);
    const [operacao, setOperacao] = useState('');
    const [openForm, setOpenForm] = useState(false);

    return (
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
                                    <Button onClick={() => {
                                    }}>
                                        <EditIcon/>
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => {
                                    }}>
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
                     setOpenForm(true);
                 }}
            >
                <AddIcon/>
            </Fab>
            <Dialog open={openForm} >
                <DialogTitle>Novo Lancamento</DialogTitle>
                <DialogContent>
                    <div>
                        <TextField
                            label="Ativo"
                            type="text"
                            variant="standard"
                        />
                        <div>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">Operação</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={operacao}
                                    label="Operação"
                                    onChange={(event) => {setOperacao(event.target.value)}}
                                >
                                    <MenuItem value={'Compra'}>Compra</MenuItem>
                                    <MenuItem value={'Venda'}>Venda</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <TextField
                            label="Quantidade"
                            type="number"
                            variant="standard"
                        />
                        <TextField
                            id="date"
                            label="Birthday"
                            type="date"
                            defaultValue="2017-05-24"
                            sx={{ width: 220 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setOpenForm(false)}}>Sair</Button>
                    <Button onClick={() => {}}>Salvar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Componente;
