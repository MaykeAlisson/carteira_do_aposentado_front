import React, {useState} from "react";

import Tipo from "./componentes/Tipo";
import Categoria from "./componentes/Categoria";
import Setor from "./componentes/Setor";
import TipoQtd from "./componentes/TipoQtd";
import {Button, Paper} from "@mui/material";

const Componente = () => {

    const [valores, setValores] = useState([]);
    const tipos = new Set();
    const categorias = new Set();
    const setores = new Set();
    const tipoQtd = new Set();

    const inputValores = () => {
        console.log(tipos)
        console.log(categorias)
        console.log(setores)
        console.log(tipoQtd)
    }

    return (
        <div>
            <Paper>
                <div style={ContainerStyle}>
                    <div>
                        <Tipo
                            // valores={}
                            update={(value) => tipos.add(value)}
                        />
                        <Categoria
                            // valores={}
                            update={(value) => categorias.add(value)}
                        />
                    </div>
                    <div>
                        <Setor
                            // valores={}
                            update={(value) => setores.add(value)}
                        />
                        <TipoQtd
                            // valores={}
                            update={(value) => tipoQtd.add(value)}
                        />
                    </div>
                    <Button onClick={() => {
                        inputValores()
                    }}>Add Valores</Button>
                </div>
            </Paper>
            <div>
                {
                    tipos.forEach(value => {
                        <span>input</span>
                    })
                }
            </div>
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

export default Componente;
