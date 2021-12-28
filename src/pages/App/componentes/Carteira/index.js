import React from "react";

import Tipo from "./componentes/Tipo";
import Categoria from "./componentes/Categoria";
import Setor from "./componentes/Setor";
import TipoQtd from "./componentes/TipoQtd";

const Componente = () => {

    return(
        <div>
            <Tipo/>
            <Categoria/>
            <Setor/>
            <TipoQtd/>
        </div>
    );
};

export default Componente;
