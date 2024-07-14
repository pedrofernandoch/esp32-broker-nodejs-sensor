import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom'

export default function ListItemButton(props) {
    return (
        <Tooltip title={props.text}>
            <ListItem button component={Link} to={props.path}>
                <ListItemIcon>
                    {props.children}
                </ListItemIcon>
                <ListItemText primary={props.text} />
            </ListItem>
        </Tooltip>
    );
}