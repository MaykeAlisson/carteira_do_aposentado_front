import React, {useState} from "react";
import {AppBar, Box, Button, Divider, Drawer, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';


function InboxIcon() {
    return null;
}

function MailIcon() {
    return null;
}

const Componente = ({onLogoutSuccess}) => {

    const [openMenu, setOpenMenu] = useState(false);

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
                            Carteira do Aposentado
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                sx={{
                    width: 240,
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
                <Typography>CONTA</Typography>
                <Divider/>
                <Typography>MENUS</Typography>
            </Drawer>
        </>
    );
};

export default Componente;
