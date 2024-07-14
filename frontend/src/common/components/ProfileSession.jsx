import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../../auth/authActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { withStyles } from '@mui/styles'
import Grid from '@mui/material/Grid'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'

const styles = theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
});

class ProfileSession extends Component {

    render() {
        const { name, email } = this.props.user
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <FormControlLabel
                    control={<Switch color="warning" />}
                    label="PT/EN"
                    labelPlacement="end"
                    onChange={e=> this.props.setLocale(e.target.checked ? 'en' : 'pt')}
                />
                <Grid container spacing={1} direction="row" justify="flex-end" alignItems="center">
                    <Grid item>
                        <Avatar>{name.charAt(0)}</Avatar>
                    </Grid>
                    <span>{email}</span>
                    <IconButton edge="end" aria-haspopup="true" onClick={this.props.logout}>
                        <ExitToAppIcon style={{ color: '#ffffff' }} />
                    </IconButton>
                </Grid>
            </div>
        )
    }
}

ProfileSession.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ user: state.auth.user })
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)
export default compose(withStyles(styles, { name: 'ProfileSession' }), connect(mapStateToProps, mapDispatchToProps))(ProfileSession);