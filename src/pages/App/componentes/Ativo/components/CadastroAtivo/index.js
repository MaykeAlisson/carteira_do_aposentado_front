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
import updateAtivo from "../UpdateAtivo";

const ativoService = Api.Ativo;

const Componente = ({open, onClose, onReload, update, ativoUpdate}) => {

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
        // checkValues();
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

    const checkValues = () => {
        if (isEmpty(ativoUpdate)) return;
        const filterTipo = tipoValue.filter(tipo => tipo.descricao ===  ativoUpdate.tipo);
        const filterCategoria = categoriaValue.filter(cat => cat.descricao ===  ativoUpdate.categoria);
        const filterSetor = setorValue.filter(setor => setor.descricao ===  ativoUpdate.setor);
        setNome(ativoUpdate.nome);
        setTipo(filterTipo[0].value);
        setCategoria(filterCategoria[0].value);
        setSetor(filterSetor[0].value);
        setQtd(ativoUpdate.qtd);
        setValor(ativoUpdate.valor);
        setPorcentagem(ativoUpdate.porcentagem);
        setObservacao(ativoUpdate.observacao);

    }

    const filterConstantes = (data) => {
        const setores = data.find(obj => obj.nome === 'setor');
        setSetorValue(setores.constanteValue)
        const categorias = data.find(obj => obj.nome === 'categoria');
        setCategoriaValue(categorias.constanteValue)
        const tipos = data.find(obj => obj.nome === 'tipo');
        setTipoValue(tipos.constanteValue)
    }

    const cadastroAtivo = async () => {
        if (isEmpty(nome) && isEmpty(ativoUpdate)) return msgAviso('Nome obrigatorio!');
        if ((isEmpty(qtd) || qtd <= 0) && isEmpty(ativoUpdate)) return msgAviso('Qtd obrigatorio!');
        if ((isEmpty(valor) || valor <= 0) && isEmpty(ativoUpdate)) return msgAviso('Valor obrigatorio!');
        if (isEmpty(tipo) && isEmpty(ativoUpdate)) return msgAviso('Tipo obrigatorio!');
        if (isEmpty(categoria) && isEmpty(ativoUpdate)) return msgAviso('Categoria obrigatorio!');
        if (isEmpty(setor) && isEmpty(ativoUpdate)) return msgAviso('Setor obrigatorio!');
        if ((isEmpty(porcentagem) || valor <= 0) && isEmpty(ativoUpdate)) return msgAviso('Porcentagem obrigatorio!');
        if (isEmpty(observacao) && isEmpty(ativoUpdate)) return msgAviso('Observação obrigatorio!');

        const filterTipo = await tipoValue.filter(tipo => tipo.descricao === ativoUpdate.tipo);
        const filterCategoria = await categoriaValue.filter(cat => cat.descricao ===  ativoUpdate.categoria);
        const filterSetor = await setorValue.filter(setor => setor.descricao ===  ativoUpdate.setor);
        console.log(tipoValue)
        console.log(categoriaValue)
        console.log(setorValue)
        console.log('///////////////')
        console.log( ativoUpdate.tipo)
        console.log( ativoUpdate.categoria)
        console.log( ativoUpdate.setor)
        console.log('///////////////')
        console.log(filterTipo)
        console.log(filterCategoria)
        console.log(filterSetor)

        const ativo = {
            nome: isEmpty(nome) ? ativoUpdate.nome : nome,
            tipo: isEmpty(tipo) ? filterTipo[0].value : tipo,
            categoria: isEmpty(categoria) ? filterCategoria[0].value : categoria,
            setor: isEmpty(setor) ? filterSetor[0].value : setor,
            qtd: isEmpty(qtd) ? ativoUpdate.qtd : qtd,
            valor: isEmpty(valor) ? ativoUpdate.valor : valor,
            porcentagem: isEmpty(porcentagem) ? ativoUpdate.porcentagem : porcentagem,
            observacao: isEmpty(observacao) ? ativoUpdate.observacao : observacao
        };

        try {
            setLoading(true);
            // await ativoService.cadastro(ativo);
            console.log(ativo);
            // onReload();
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
                <DialogTitle>{isEmpty(ativoUpdate) ? 'Novo Ativo' : ativoUpdate.nome}</DialogTitle>
                <Divider/>
                <DialogContent >
                <div style={RowStyle}>
                    <TextField
                        id="ativo-nome"
                        label="Nome"
                        type="text"
                        value={nome}
                        disabled={update}
                        onChange={e => setNome(e.target.value)}
                        defaultValue={ isEmpty(ativoUpdate) ? nome : ativoUpdate.nome}
                    />
                    <TextField
                        id="ativo-qtd"
                        label="Quantidade"
                        type="number"
                        value={qtd}
                        defaultValue={ isEmpty(ativoUpdate) ? qtd : ativoUpdate.qtd}
                        sx={InputNumberStyle}
                        onChange={e => setQtd(e.target.value)}
                    />
                    <TextField
                        id="ativo-valor"
                        label="Valor"
                        type="number"
                        sx={InputNumberStyle}
                        onChange={e => setValor(e.target.value)}
                        defaultValue={ isEmpty(ativoUpdate) ? valor : ativoUpdate.valor}
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
                            disabled={update}
                            defaultValue={ isEmpty(ativoUpdate) ? tipo : ativoUpdate.tipo}
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
                            defaultValue={ isEmpty(ativoUpdate) ? categoria : ativoUpdate.categoria}
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
                            disabled={update}
                            defaultValue={ isEmpty(ativoUpdate) ? setor : ativoUpdate.setor}
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
                        defaultValue={ isEmpty(ativoUpdate) ? porcentagem : ativoUpdate.porcentagem}
                        sx={InputNumberStyle}
                        onChange={e => setPorcentagem(e.target.value)}
                    />
                    <TextField
                        id="ativo-observacao"
                        label="Observacao"
                        type="text"
                        defaultValue={ isEmpty(ativoUpdate) ? observacao : ativoUpdate.observacao}
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
    update: PropTypes.bool,
    ativo: PropTypes.object,
};

Componente.defaultProps = {
    open: false,
    onClose: () => {},
    onReload: () => {},
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
