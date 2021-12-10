import React, {useContext, useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import PropTypes from "prop-types";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import {Api} from 'Services/api';
import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';
import isEmpty from "Util/isEmpty";

const ativoService = Api.Ativo;

const INITIAL_STATE = {
    nome: '',
    tipo: undefined,
    categoria: undefined,
    setor: undefined,
    qtd: undefined,
    valor: undefined,
    porcentagem: undefined,
    observacao: '',
};

const Componente = ({open, onClose, onReload, update, ativoUpdate}) => {

    const {setLoading} = useContext(LoadingContext);
    const {msgErro, msgAviso} = useContext(MessageContext);
    const [tipoValue, setTipoValue] = useState([]);
    const [categoriaValue, setCategoriaValue] = useState([]);
    const [setorValue, setSetorValue] = useState([]);
    const [ativo, setAtivo] = useState({...INITIAL_STATE})

    useEffect(() => {
        buscarConstantes();
        checkValues();
    }, [ativoUpdate]);

    const buscarConstantes = async () => {
        try {
            setLoading(true);
            const response = await ativoService.constantes();
            if (isEmpty(response)) {
                msgAviso('Não foi possivel concluir solicitação! Tente novamente!');
                return;
            }
            filterConstantes(response)
        } catch (e) {
            console.log(e);
            msgErro(e.message)
        } finally {
            setLoading(false);
        }
    }

    const checkValues = async () => {
        if (!isEmpty(ativoUpdate)) {
            const filterTipo = await tipoValue.filter(tipo => tipo.descricao === ativoUpdate.tipo);
            const filterCategoria = await categoriaValue.filter(cat => cat.descricao === ativoUpdate.categoria);
            const filterSetor = await setorValue.filter(setor => setor.descricao === ativoUpdate.setor);
            setAtivo({
                ...ativoUpdate,
                tipo: filterTipo[0].value,
                categoria: filterCategoria[0].value,
                setor: filterSetor[0].value
            })
        }
    }

    const filterConstantes = (data) => {
        const setores = data.find(obj => obj.nome === 'setor');
        setSetorValue(setores.constanteValue)
        const categorias = data.find(obj => obj.nome === 'categoria');
        setCategoriaValue(categorias.constanteValue)
        const tipos = data.find(obj => obj.nome === 'tipo');
        setTipoValue(tipos.constanteValue)
    }

    const setValue = ({target}) => setAtivo({
        ...ativo,
        [target.name]: target.value,
    });

    const cadastroAtivo = async () => {
        if (isEmpty(ativo.nome)) return msgAviso('Nome obrigatorio!');
        if (isEmpty(ativo.qtd) || ativo.qtd <= 0) return msgAviso('Qtd obrigatorio!');
        if (isEmpty(ativo.valor) || ativo.valor <= 0) return msgAviso('Valor obrigatorio!');
        if (isEmpty(ativo.tipo)) return msgAviso('Tipo obrigatorio!');
        if (isEmpty(ativo.categoria)) return msgAviso('Categoria obrigatorio!');
        if (isEmpty(ativo.setor)) return msgAviso('Setor obrigatorio!');
        if (isEmpty(ativo.porcentagem) || ativo.porcentagem <= 0) return msgAviso('Porcentagem obrigatorio!');
        if (isEmpty(ativo.observacao)) return msgAviso('Observação obrigatorio!');

        const dados = {
            ...ativo,
            qtd: Number(ativo.qtd),
            valor: Number(ativo.valor),
            porcentagem: Number(ativo.porcentagem)
        };

        try {
            setLoading(true);
            update
                ? await ativoService.update(dados)
                : await ativoService.cadastro(dados)
            setAtivo({...INITIAL_STATE})
            onReload();
        } catch (e) {
            console.log(e);
            msgErro(e.message)
        } finally {
            setLoading(false);
        }
    };

    const deletarAtivo = async (id) => {
        try {
            setLoading(true);
            await ativoService.delete(id)
            setAtivo({...INITIAL_STATE})
            onReload();
        } catch (e) {
            console.log(e);
            msgErro(e.message)
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dialog open={open}>
                <div style={{display: 'flex', flexDirection: 'row',}}>
                    <DialogTitle>{isEmpty(ativo.nome) ? 'Novo Ativo' : ativo.nome}</DialogTitle>
                    <Button style={{display: update ? '' : 'none'}} onClick={() => deletarAtivo(ativo.id)}>
                        <DeleteOutlineIcon color={"error"}/>
                    </Button>
                </div>
                <Divider/>
                <DialogContent>
                    <div style={RowStyle}>
                        <TextField
                            name='nome'
                            id="ativo-nome"
                            label="Nome"
                            type="text"
                            value={ativo.nome}
                            disabled={update}
                            onChange={setValue}
                            style={{display: update ? 'none' : ''}}
                        />
                        <TextField
                            name='qtd'
                            id="ativo-qtd"
                            label="Quantidade"
                            type="number"
                            value={ativo.qtd}
                            sx={InputNumberStyle}
                            onChange={setValue}
                        />
                        <TextField
                            name='valor'
                            id="ativo-valor"
                            label="Valor"
                            type="number"
                            value={ativo.valor}
                            sx={InputNumberStyle}
                            onChange={setValue}
                        />
                    </div>
                    <div style={RowStyle}>
                        <FormControl variant="outlined">
                            <InputLabel id="select-tipo">Tipo</InputLabel>
                            <Select
                                name='tipo'
                                labelId="select-tipo"
                                id="select-tipo"
                                value={ativo.tipo}
                                onChange={setValue}
                                label="tipo"
                                sx={InputSelectStyle}
                                disabled={update}
                                style={{display: update ? 'none' : ''}}
                            >
                                {
                                    tipoValue.map((value) => (
                                        <MenuItem value={value.value} key={value.descricao}>{value.descricao}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel id="select-categoria"
                                        style={{display: update ? 'none' : ''}}>Categoria</InputLabel>
                            <Select
                                name='categoria'
                                labelId="select-categoria"
                                id="select-categoria"
                                value={ativo.categoria}
                                onChange={setValue}
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
                                name='setor'
                                labelId="select-setor"
                                id="select-setor"
                                value={ativo.setor}
                                onChange={setValue}
                                label="setor"
                                sx={InputSelectStyle}
                                disabled={update}
                                style={{display: update ? 'none' : ''}}
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
                            name='porcentagem'
                            id="ativo-porcentagem"
                            label="Porcentagem"
                            type="number"
                            value={ativo.porcentagem}
                            sx={InputNumberStyle}
                            onChange={setValue}
                        />
                        <TextField
                            name='observacao'
                            id="ativo-observacao"
                            label="Porque Investi?"
                            type="text"
                            value={ativo.observacao}
                            onChange={setValue}
                            inputProps={{
                                maxLength: 70,
                            }}
                        />
                    </div>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button autoFocus onClick={() => {
                        setAtivo({...INITIAL_STATE})
                        onClose()
                    }}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color={"primary"} onClick={() => {
                        cadastroAtivo()
                    }}>
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
    update: PropTypes.bool,
    ativo: PropTypes.object,
};

Componente.defaultProps = {
    open: false,
    onClose: () => {
    },
    onReload: () => {
    },
    update: false,
    ativo: {},
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
