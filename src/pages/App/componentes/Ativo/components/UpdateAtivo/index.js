import React, {useContext, useState} from 'react';
import PropTypes from "prop-types";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";

import { Api } from 'Services/api';
import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';
import isEmpty from "Util/isEmpty";

const ativoService = Api.Ativo;

const Componente = ({open, onClose, ativo, categorias, onReload}) => {

    console.log(ativo)
    const { setLoading } = useContext(LoadingContext);
    const { msgErro, msgAviso } = useContext(MessageContext);
    const [updateAtivo, setUpdateAtivo] = useState(ativo);
    const [categoriaValue, setCategoriaValue] = useState(categorias);
    const [categoria, setCategoria] = useState(ativo.categoria);
    const [qtd, setQtd] = useState();
    const [valor, setValor] = useState();
    const [porcentagem, setPorcentagem] = useState();
    const [observacao, setObservacao] = useState();

    const saveUpdate = async () => {
        if (isEmpty(qtd) || qtd <= 0) return msgAviso('Qtd obrigatorio!');
        if (isEmpty(valor) || valor <= 0) return msgAviso('Valor obrigatorio!');
        if (isEmpty(categoria)) return msgAviso('Categoria obrigatorio!');
        if (isEmpty(porcentagem) || valor <= 0) return msgAviso('Porcentagem obrigatorio!');
        if (isEmpty(observacao)) return msgAviso('Observação obrigatorio!');

        const ativo = {nome: updateAtivo.nome, tipo: updateAtivo.tipo, categoria, setor: updateAtivo.setor, qtd, valor, porcentagem, observacao};

        try {
            setLoading(true);
            // await ativoService.cadastro(ativo);
            onReload();
        }catch (e) {
            console.log(e);
            msgErro(e)
        }finally {
            setLoading(false);
        }
    };

    return(
            <Dialog open={open}>
                <DialogTitle>{ativo.nome}</DialogTitle>
                <Divider/>
                <DialogContent >
                    <div >
                        <TextField
                            id="ativo-qtd"
                            label="Quantidade"
                            type="number"
                            // sx={InputNumberStyle}
                            onChange={e => setQtd(e.target.value)}
                        />
                        <TextField
                            id="ativo-valor"
                            label="Valor"
                            type="number"
                            // sx={InputNumberStyle}
                            onChange={e => setValor(e.target.value)}
                        />
                    </div>
                    <div >
                        <FormControl variant="outlined">
                            <InputLabel id="select-categoria">Categoria</InputLabel>
                            <Select
                                labelId="select-categoria"
                                id="select-categoria"
                                value={categoria}
                                onChange={(event) => setCategoria(event.target.value)}
                                label="categoria"
                                // sx={InputSelectStyle}
                            >
                                {
                                    categoriaValue.map((value) => (
                                        <MenuItem value={value.value} key={value.descricao}>{value.descricao}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <TextField
                            id="ativo-porcentagem"
                            label="Porcentagem"
                            type="number"
                            // sx={InputNumberStyle}
                            onChange={e => setPorcentagem(e.target.value)}
                        />
                        <TextField
                            id="ativo-observacao"
                            label="Observacao"
                            type="text"
                            onChange={e => setObservacao(e.target.value)}
                        />
                    </div>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button onClick={() => {
                        onClose()
                    }}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color={"primary"} onClick={() => {saveUpdate()}}>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
    );
};

Componente.propType = {
    ativo: PropTypes.object,
    categorias: PropTypes.array,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onReload: PropTypes.func,
};

Componente.defaultProps = {
    ativo: {},
    categorias: [],
    open: false,
    onClose: () => {},
    onReload: () => {},
};

export default Componente;
