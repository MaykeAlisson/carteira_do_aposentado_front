import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField,} from "@mui/material";

import isEmpty from "Util/isEmpty";
import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';
import {Api} from 'Services/api';

const fundamentoService = Api.Fundamento;

const INITIAL_STATE = {
    pL: undefined,
    pVPA: undefined,
    dY: undefined,
    rOE: undefined,
    ebitda: undefined,
    dvPL: undefined,
    notaGov: undefined,
};

const Componente = ({idAtivo, open, onClose, onReload}) => {

    const {setLoading} = useContext(LoadingContext);
    const {msgErro, msgAviso} = useContext(MessageContext);
    const [fundamento, setFundamento] = useState({...INITIAL_STATE})

    const setValue = ({target}) => setFundamento({
        ...fundamento,
        [target.name]: target.value,
    });

    const cadastroFundamento = async () => {
        if (isEmpty(fundamento.pL)) return msgAviso('PL obrigatorio!');
        if (isEmpty(fundamento.pVPA)) return msgAviso('PVPA obrigatorio!');
        if (isEmpty(fundamento.dY)) return msgAviso('DY obrigatorio!');
        if (isEmpty(fundamento.rOE)) return msgAviso('Roe obrigatorio!');
        if (isEmpty(fundamento.ebitda)) return msgAviso('Ebitda obrigatorio!');
        if (isEmpty(fundamento.dvPL)) return msgAviso('Dv/Pl obrigatorio!');
        if (isEmpty(fundamento.notaGov) || fundamento.notaGov < 0) return msgAviso('Nota Governaça obrigatorio!');

        const dados = {
            pL: Number(fundamento.pL),
            pVPA: Number(fundamento.pVPA),
            dY: Number(fundamento.dY),
            rOE: Number(fundamento.rOE),
            ebitda: Number(fundamento.ebitda),
            dvPL: Number(fundamento.dvPL),
            notaGov: Number(fundamento.notaGov),
        };

        try {
            setLoading(true);
            await fundamentoService.create(idAtivo, dados);
            setFundamento({...INITIAL_STATE});
            onReload(idAtivo);
        } catch (e) {
            console.log(e);
            msgErro(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Dialog open={open}>
                <div style={{display: 'flex', flexDirection: 'row',}}>
                    <DialogTitle>Fundamento</DialogTitle>
                </div>
                <Divider/>
                <DialogContent>
                    <div style={RowStyle}>
                        <div>
                            <TextField
                                name='pL'
                                label="PL"
                                type="number"
                                value={fundamento.pL}
                                sx={InputNumberStyle}
                                onChange={setValue}
                            />
                            <TextField
                                name='pVPA'
                                label="PVPA"
                                type="number"
                                sx={InputNumberStyle}
                                value={fundamento.pVPA}
                                onChange={setValue}
                            />
                            <TextField
                                name='dY'
                                label="DY"
                                type="number"
                                sx={InputNumberStyle}
                                value={fundamento.dY}
                                onChange={setValue}
                            />
                            <TextField
                                name='rOE'
                                label="ROE"
                                type="number"
                                sx={InputNumberStyle}
                                value={fundamento.rOE}
                                onChange={setValue}
                            />
                        </div>
                        <div>
                            <TextField
                                name='ebitda'
                                label="Ebitda"
                                type="number"
                                sx={InputNumberStyle}
                                value={fundamento.ebitda}
                                onChange={setValue}
                            />
                            <TextField
                                name='dvPL'
                                label="Dv/Pl"
                                type="number"
                                sx={InputNumberStyle}
                                value={fundamento.dvPL}
                                onChange={setValue}
                            />
                            <TextField
                                name='notaGov'
                                label="Nota Governança"
                                type="number"
                                value={fundamento.notaGov}
                                onChange={setValue}
                            />
                        </div>
                    </div>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button autoFocus onClick={() => {
                        setFundamento({...INITIAL_STATE})
                        onClose()
                    }}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color={"primary"} onClick={() => {
                        cadastroFundamento()
                    }}>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

Componente.propType = {
    idAtivo: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onReload: PropTypes.func,
};

Componente.defaultProps = {
    idAtivo: '',
    open: false,
    onClose: () => {
    },
    onReload: () => {
    },
};

const RowStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px',
    gap: 10
};

const InputNumberStyle = {
    maxWidth: 100,
    marginRight: '10px'
};

export default Componente;
