import React from 'react'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ManageHistoryIcon from '@mui/icons-material/ManageHistory'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import ListItemButton from './ListItemButton'
import {locale} from '../utils/textLocale'

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export default function Menu(props) {
  const listItems = (
    <div>
      <ListItemButton text={locale[props.locale].sidebar.tempHum} path="/">
        <ThermostatIcon />
      </ListItemButton>
      <ListItemButton text={locale[props.locale].sidebar.users} path="users">
        <AccountCircleIcon />
      </ListItemButton>
      <ListItemButton text="Logs" path="logs">
        <ManageHistoryIcon />
      </ListItemButton>
    </div>
  )
  return (
    <Drawer variant="permanent" open={props.open}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1], }}>
        <IconButton onClick={props.toggleDrawer}><ChevronLeftIcon /></IconButton>
      </Toolbar>
      <Divider />
      <List>{listItems}</List>
    </Drawer>
  )
}