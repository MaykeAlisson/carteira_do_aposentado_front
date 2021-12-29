import React, {useState} from "react";
import {Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Paper, Select} from "@mui/material";
import PropTypes from "prop-types";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const Componente = ({valores, update}) => {

    const [selecionados, setSelecionados] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelecionados(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        update(typeof value === 'string' ? value.split(',') : value)
    };

    return(
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Tipo</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selecionados}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {valores.map((value) => (
                        <MenuItem key={value.descricao} value={value.descricao}>
                            <Checkbox checked={selecionados.indexOf(value.descricao) > -1} />
                            <ListItemText primary={value.descricao} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

Componente.propType = {
    valores: [],
    update: () => {},
};

Componente.defaultProps = {
    valores: PropTypes.array,
    update: PropTypes.func,
};

export default Componente;
