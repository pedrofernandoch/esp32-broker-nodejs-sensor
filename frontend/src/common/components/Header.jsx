import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import ProfileSession from './ProfileSession'

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function Header(props) {
    return (
        <AppBar position="absolute" open={props.open} style={{backgroundColor: "#1094a"}}>
            <Toolbar sx={{ pr: '24px' }}>
                <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={props.toggleDrawer}
                    sx={{ marginRight: '36px', ...(props.open && { display: 'none' }), }} >
                    <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>Smart USP</Typography>
                <ProfileSession setLocale={props.setLocale}/>
            </Toolbar>
        </AppBar>
    );
}