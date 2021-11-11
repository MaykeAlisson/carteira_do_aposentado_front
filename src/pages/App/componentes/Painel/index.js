import React, {useContext} from "react";
import {Box} from "@mui/material";

import AppContext from "Contexts/contexto";

const Page = () => {

    const {usuario} = useContext(AppContext);

    return (
        <Box sx={{bgcolor: '#cfe8fc', height: '100vh'}}>
            <span>Painel</span>
            <span>{usuario.nome}</span>
        </Box>
    );
}

export default Page;
