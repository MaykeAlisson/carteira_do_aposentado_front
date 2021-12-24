import React from "react";
import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";


const Componente = () => {

    return(
        <>
            <h1>Lancamento</h1>
            <Fab color="primary"
                 aria-label="add"
                 sx={{
                     position: 'fixed',
                     bottom: 16,
                     right: 16,
                 }}
                 onClick={() => {

                 }}
            >
                <AddIcon/>
            </Fab>
        </>
    );
};

export default Componente;
