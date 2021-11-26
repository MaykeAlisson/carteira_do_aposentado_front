import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

import {AppBar, Box, Button, Divider, Drawer, IconButton, MenuItem, MenuList, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

import Contexto from 'Contexts/contexto';
import isEmpty from "Util/isEmpty";
import AreaUsuario from "./AreaUsuario";

const Componente = ({onLogoutSuccess}) => {

    const navigate = useNavigate();
    const {usuario} = useContext(Contexto);
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
    }, [usuario])

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar color={"primary"} position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            onClick={() => {
                                setOpenMenu(true)
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Aposentando....<DirectionsRunIcon fontSize="small"/>
                        </Typography>
                        <Button color="inherit">{isEmpty(usuario.nome) ? `Sr(a) Rico(a)` : usuario.nome}</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                sx={{
                    width: 220,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                    },
                }}
                anchor="left"
                open={openMenu}
                onClose={() => {
                    setOpenMenu(false);
                }}
            >
                <AreaUsuario
                    userName={usuario.nome}
                    onLogoutSuccess={() => {
                        onLogoutSuccess()
                    }}
                />
                <Divider/>
                <MenuList>
                    <MenuItem
                        onClick={() => {
                            navigate('/')
                            setOpenMenu(false)
                        }}
                    >
                        <DashboardIcon/>
                        <Typography
                            variant="inherit"
                            style={{marginLeft: 12}}>
                            Carteira
                        </Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            navigate('/ativo')
                            setOpenMenu(false)
                        }}
                    >
                        <AnalyticsIcon/>
                        <Typography
                            variant="inherit"
                            style={{marginLeft: 12}}
                        >Ativos
                        </Typography>
                    </MenuItem>
                </MenuList>
            </Drawer>
        </>
    );
};

export default Componente;
