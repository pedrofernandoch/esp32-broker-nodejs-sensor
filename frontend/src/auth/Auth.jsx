import React, { Component } from 'react'
import compose from 'recompose/compose'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { withStyles } from '@mui/styles'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { login } from './authActions'
import Messanger from '../common/utils/Messanger'
import Footer from '../common/components/Footer'
import { renderTextField } from '../common/utils/fieldRendering'
import { theme } from '../assets/styles'
import { ThemeProvider } from '@mui/material/styles'
import authBackground0 from '../assets/icmc-bg0.png'
import authBackground1 from '../assets/icmc-bg1.jpg'
import authBackground2 from '../assets/icmc-bg2.png'
import authBackground3 from '../assets/icmc-bg3.png'
import authBackground4 from '../assets/icmc-bg4.png'
import authBackground5 from '../assets/icmc-bg5.jpg'
import {locale} from '../common/utils/textLocale'

const authBackgrounds = [authBackground0, authBackground1, authBackground2, authBackground3, authBackground4, authBackground5]

const styles = {
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${authBackgrounds[Math.floor(Math.random()*authBackgrounds.length)]})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#3f51b5',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}

const validate = values => {
    const errors = {}
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email adress'
    }
    return errors
}

class Auth extends Component {

    render() {
        const { handleSubmit, classes, login } = this.props
        return (
            <ThemeProvider theme={theme}>
                <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">Login</Typography>
                            <form className={classes.form} noValidate onSubmit={handleSubmit(v => login(v))}>
                                <Field component={renderTextField} variant="outlined" margin="normal" required fullWidth id="email" label="Email" name="email" autoComplete="email" autoFocus />
                                <Field component={renderTextField} variant="outlined" margin="normal" required fullWidth name="password" label={locale[this.props.locale].signin.password} type="password" id="password" autoComplete="current-password" />
                                <Button type="submit" fullWidth variant="contained" style={{ backgroundColor: '#3f51b5', color: '#ffffff' }} className={classes.submit}>{locale[this.props.locale].signin.enter}</Button>
                                <Box mt={5}>
                                    <Footer />
                                </Box>
                            </form>
                        </div>
                    </Grid>
                    <Messanger />
                </Grid>
            </ThemeProvider>
        )
    }
}

Auth = reduxForm({ form: 'Auth', validate })(Auth)
Auth.propTypes = {
    classes: PropTypes.object.isRequired,
}
const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch)
export default compose(withStyles(styles, { name: 'Auth', withTheme: true }), connect(null, mapDispatchToProps))(Auth)