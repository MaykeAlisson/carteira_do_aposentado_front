import React, {useState} from "react";
import {
    AppBar,
    Box,
    Button, Divider, Drawer,
    IconButton,
    ListItem,
    ListItemIcon, ListItemText,
    SwipeableDrawer,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {List} from "@mui/icons-material";
import * as PropTypes from "prop-types";


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
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            onClick={() => {setOpenMenu(true)}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
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
                    onClose={() => {setOpenMenu(false);}}
                >
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default Componente;
