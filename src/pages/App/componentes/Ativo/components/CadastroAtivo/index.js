import React, {useContext, useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import PropTypes from "prop-types";

import { Api } from 'Services/api';
import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';
import isEmpty from "Util/isEmpty";

const ativoService = Api.Ativo;

const Componente = ({open, onClose, onReload}) => {

    const { setLoading } = useContext(LoadingContext);
    const { msgErro, msgAviso } = useContext(MessageContext);
    const [tipoValue, setTipoValue] = useState([]);
    const [categoriaValue, setCategoriaValue] = useState([]);
    const [setorValue, setSetorValue] = useState([]);
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState();
    const [categoria, setCategoria] = useState();
    const [setor, setSetor] = useState();
    const [qtd, setQtd] = useState();
    const [valor, setValor] = useState();
    const [porcentagem, setPorcentagem] = useState();
    const [observacao, setObservacao] = useState();

    useEffect(() => {
        buscarConstantes();
    }, []);

    const buscarConstantes = async () => {
        try {
            setLoading(true);
            const response = await ativoService.constantes();
            if (isEmpty(response)) {
                msgAviso('Não foi possivel concluir solicitação! Tente novamente!');
                return;
            }
          filterConstantes(response)
        }catch (e) {
            console.log(e);
            msgErro(e)
        }finally {
            setLoading(false);
        }
    }

    const filterConstantes = (data) => {
        const setores = data.find(obj => obj.nome === 'setor');
        setSetorValue(setores.constanteValue)
        const categorias = data.find(obj => obj.nome === 'tipo');
        setCategoriaValue(categorias.constanteValue)
        const tipos = data.find(obj => obj.nome === 'categoria');
        setTipoValue(tipos.constanteValue)
    }

    const cadastroAtivo = async () => {
        if (isEmpty(nome)) return msgAviso('Nome obrigatorio!');
        if (isEmpty(qtd) || qtd <= 0) return msgAviso('Qtd obrigatorio!');
        if (isEmpty(valor) || valor <= 0) return msgAviso('Valor obrigatorio!');
        if (isEmpty(tipo)) return msgAviso('Tipo obrigatorio!');
        if (isEmpty(categoria)) return msgAviso('Categoria obrigatorio!');
        if (isEmpty(setor)) return msgAviso('Setor obrigatorio!');
        if (isEmpty(porcentagem) || valor <= 0) return msgAviso('Porcentagem obrigatorio!');
        if (isEmpty(observacao)) return msgAviso('Observação obrigatorio!');

        const ativo = {nome, tipo, categoria, setor, qtd, valor, porcentagem, observacao};

        try {
            setLoading(true);
            await ativoService.cadastro(ativo);
            onReload();
        }catch (e) {
            console.log(e);
            msgErro(e)
        }finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dialog open={open}>
                <DialogTitle>Novo Ativo</DialogTitle>
                <Divider/>
                <DialogContent >
                <div style={RowStyle}>
                    <TextField
                        id="ativo-nome"
                        label="Nome"
                        type="text"
                        onChange={e => setNome(e.target.value)}
                    />
                    <TextField
                        id="ativo-qtd"
                        label="Quantidade"
                        type="number"
                        sx={InputNumberStyle}
                        onChange={e => setQtd(e.target.value)}
                    />
                    <TextField
                        id="ativo-valor"
                        label="Valor"
                        type="number"
                        sx={InputNumberStyle}
                        onChange={e => setValor(e.target.value)}
                    />
                </div>
                <div style={RowStyle}>
                    <FormControl variant="outlined">
                        <InputLabel id="select-tipo">Tipo</InputLabel>
                        <Select
                            labelId="select-tipo"
                            id="select-tipo"
                            value={tipo}
                            onChange={(event) => setTipo(event.target.value)}
                            label="tipo"
                            sx={InputSelectStyle}
                        >
                            {
                                tipoValue.map((value) => (
                                    <MenuItem value={value.value} key={value.descricao}>{value.descricao}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel id="select-categoria">Categoria</InputLabel>
                        <Select
                            labelId="select-categoria"
                            id="select-categoria"
                            value={categoria}
                            onChange={(event) => setCategoria(event.target.value)}
                            label="categoria"
                            sx={InputSelectStyle}
                        >
                            {
                                categoriaValue.map((value) => (
                                    <MenuItem value={value.value} key={value.descricao}>{value.descricao}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel id="select-setor">Setor</InputLabel>
                        <Select
                            labelId="select-setor"
                            id="select-setor"
                            value={setor}
                            onChange={(event) => setSetor(event.target.value)}
                            label="setor"
                            sx={InputSelectStyle}
                        >
                            {
                                setorValue.map((value) => (
                                    <MenuItem value={value.value} key={value.descricao}>{value.descricao}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
                <div style={RowStyle}>
                    <TextField
                        id="ativo-porcentagem"
                        label="Porcentagem"
                        type="number"
                        sx={InputNumberStyle}
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
                    <Button autoFocus onClick={() => {
                        onClose()
                    }}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color={"primary"} onClick={() => {cadastroAtivo()}}>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

Componente.propType = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onReload: PropTypes.func,
};

Componente.defaultProps = {
    open: false,
    onClose: () => {},
    onReload: () => {},
};

const RowStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px',
    gap: 10
};

const InputNumberStyle = {
    maxWidth: 100
};

const InputSelectStyle = {
    width: 150,
    maxWidth: 150
};


export default Componente;
