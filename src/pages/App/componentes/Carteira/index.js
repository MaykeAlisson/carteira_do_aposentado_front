import React, {useContext, useEffect, useState} from "react";

import Tipo from "./componentes/Tipo";
import Categoria from "./componentes/Categoria";
import TipoQtd from "./componentes/TipoQtd";
import {Fab, InputLabel, Paper, TextField} from "@mui/material";

import {Api} from 'Services/api';
import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';
import isEmpty from "Util/isEmpty";
import AddIcon from "@mui/icons-material/Add";

const ativoService = Api.Ativo;
const carteiraService = Api.Carteira;

const Componente = () => {

    const {setLoading} = useContext(LoadingContext);
    const {msgErro, msgAviso, msgSucesso} = useContext(MessageContext);
    const [tipoValue, setTipoValue] = useState([]);
    const [categoriaValue, setCategoriaValue] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [tipoQtd, setTipoQtd] = useState([]);
    const [tipo, setTipo] = useState({})
    const [categoria, setCategoria] = useState({})
    const [tipoQuantidade, setTipoQuantidade] = useState({})
    const [configCarteira, setConfigCarteira] = useState({})

    useEffect(() => {
        buscarConstantes();
    }, []);

    const clean = () => {
        setTipos([]);
        setCategorias([]);
        setTipoQtd([]);
        setTipo({});
        setCategoria({});
        setTipoQuantidade({});
    }
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

    const filterConstantes = (data) => {
        const categorias = data.find(obj => obj.nome === 'categoria');
        setCategoriaValue(categorias.constanteValue)
        const tipos = data.find(obj => obj.nome === 'tipo');
        setTipoValue(tipos.constanteValue)
    }

    const setValueAtivo = ({target}) => setTipo({
        ...tipo,
        [target.name]: target.value,
    });

    const setValueCategoria = ({target}) => setCategoria({
        ...categoria,
        [target.name]: target.value,
    });

    const setValueTipoQtd = ({target}) => setTipoQuantidade({
        ...tipoQuantidade,
        [target.name]: target.value,
    });

    const save = async () => {
        const sumTipo = sumPorcentagem(tipo);
        const sumCategoria = sumPorcentagem(categoria);
        if (sumTipo > 100) return msgErro("Porcentagem dos Tipo maior que 100%")
        if (sumCategoria > 100) return msgErro("Porcentagem das Categorias maior que 100%")

        const carteira = await createCarteira();

        try {
            setLoading(true);
            await carteiraService.create(carteira)
            clean();
            msgSucesso("Configurações salva");
        } catch (e) {
            console.log(e);
            msgErro(e.message)
        } finally {
            setLoading(false);
        }

    }

    const sumPorcentagem = (value) => {
        let porcentagem = 0;
        for (let key in value) {
            porcentagem += Number(value[key]);
        }
        return porcentagem;
    };

    const createCarteira = async () => {

        let obj = {};
        let porcentagemTipo = [];
        let porcentagemCategoria = [];
        let tipoQtds = [];

        for (let key in tipo) {
            let value = await tipoValue.filter(tipo => tipo.descricao === key);
            let json = {
                tipo: value[0].value,
                porcentagem: Number(tipo[key])
            }
            porcentagemTipo.push(json)
        }

        for (let key in categoria) {
            let value = await categoriaValue.filter(cat => cat.descricao === key);
            let json = {
                categoria: value[0].value,
                porcentagem: Number(categoria[key])
            }
            porcentagemCategoria.push(json)
        }

        for (let key in tipoQuantidade) {
            let value = await tipoValue.filter(tipo => tipo.descricao === key);
            let json = {
                tipo: value[0].value,
                qtd: Number(tipoQuantidade[key])
            }
            tipoQtds.push(json)
        }

        obj['porcentagemCategoria'] = porcentagemCategoria;
        obj['porcentagemTipo'] = porcentagemTipo;
        obj['tipoQtds'] = tipoQtds;

        return obj;

    }

    return (
        <div>
            <Paper>
                <div style={ContainerStyle}>
                    <Tipo
                        valores={tipoValue}
                        update={(value) => setTipos(value)}
                    />
                    <Categoria
                        valores={categoriaValue}
                        update={(value) => setCategorias(value)}
                    />
                    <TipoQtd
                        valores={tipoValue}
                        update={(value) => setTipoQtd(value)}
                    />
                </div>
            </Paper>
            <div style={{display: "flex", flexDirection: 'row', gap: 10}}>
                {
                    tipos.map((value) => (
                        <div style={{display: 'flex', flexDirection: 'column',}}>
                            <InputLabel>{value}</InputLabel>
                            <TextField
                                name={value}
                                id="tipo-porcentagem"
                                label="%"
                                type="number"
                                sx={InputNumberStyle}
                                onChange={setValueAtivo}
                            />
                        </div>
                    ))
                }
            </div>
            <div style={{display: "flex", flexDirection: 'row', gap: 10}}>
                {
                    categorias.map((value) => (
                        <div style={{display: 'flex', flexDirection: 'column',}}>
                            <InputLabel>{value}</InputLabel>
                            <TextField
                                name={value}
                                id="categoria-porcentagem"
                                label="%"
                                type="number"
                                sx={InputNumberStyle}
                                onChange={setValueCategoria}
                            />
                        </div>
                    ))
                }
            </div>
            <div style={{display: "flex", flexDirection: 'row', gap: 10}}>
                {
                    tipoQtd.map((value) => (
                        <div style={{display: 'flex', flexDirection: 'column',}}>
                            <InputLabel>{value}</InputLabel>
                            <TextField
                                name={value}
                                id="tipo-qtd"
                                label="Quantidade"
                                type="number"
                                sx={InputNumberStyle}
                                onChange={setValueTipoQtd}
                            />
                        </div>
                    ))
                }
            </div>
            <Fab color="primary"
                 aria-label="add"
                 sx={{
                     position: 'fixed',
                     bottom: 16,
                     right: 16,
                 }}
                 onClick={() => {
                     save();
                 }}
            >
                <AddIcon/>
            </Fab>
        </div>
    );
};

const ContainerStyle = {
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

export default Componente;
