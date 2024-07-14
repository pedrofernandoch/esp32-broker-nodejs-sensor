import React, { Component } from 'react'
import { Field } from 'redux-form'
import Grid from '@mui/material/Grid'
import { renderTextField, renderCheckbox } from '../common/utils/fieldRendering'
import {locale} from '../common/utils/textLocale'

class UserForm extends Component {

    render() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Field component={renderTextField} name="name" label={locale[this.props.locale].user.edit.name} margin="dense" fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <Field component={renderTextField} name="email" label="Email" margin="dense" fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <Field component={renderTextField} name="password" label={locale[this.props.locale].user.edit.password} margin="dense" type="password" fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <Field component={renderTextField} name="confirmPassword" label={locale[this.props.locale].user.edit.confirmPassword} margin="dense" type="password" fullWidth />
                </Grid>
                <Grid item xs={4}>
                    <Field name="admin" component={renderCheckbox} margin="dense"label="Admin" fullWidth/>
                </Grid>
            </Grid>
        )
    }
}

export default UserForm