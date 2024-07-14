import React, { Component } from "react";
import TableView from "../table/TableView";
import axios from "axios";
import compose from "recompose/compose";
import { reduxForm } from "redux-form";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import If from "../common/utils/If";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { withStyles } from "@mui/styles";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@mui/material/styles";
import { baseApiUrl } from "../common/utils/systemConstants";
import {
    backdropStyles,
    paperStyles,
    formStyles,
    theme,
} from "../assets/styles";
import { setUserToInitialState, setUser } from "./userActions";
import UserForm from "./UserForm";
import {locale} from '../common/utils/textLocale'

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        padding: "15px",
    },
    paper: paperStyles,
    form: formStyles,
    submit: {
        margin: theme.spacing(4, 0, 0),
    },
    backdrop: backdropStyles,
});

const validate = (values) => {
    const errors = {};
    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = "Invalid email address";
    }
    if (!values.email) {
        errors.email = "Email is required";
    }
    if (
        values.name === null ||
        values.name === undefined ||
        values.name === ""
    ) {
        errors.name = "Name is required";
    }
    if (values.password && values.confirmPassword) {
        if (values.password !== values.confirmPassword) {
            errors.password = "Passwords does not match";
            errors.confirmPassword = "Passwords does not match";
        }
    } else if (values.password && !values.confirmPassword) {
        errors.confirmPassword = "Confirm password is required";
    } else if (!values.password && values.confirmPassword) {
        errors.password = "Password is required";
    }
    return errors;
};

class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showBackDrop: false,
            modalVisibility: false,
            modalTitle: "",
            modalCrudType: "",
            entityId: "",
        };
    }

    onSubmit = async (values) => {
        const body = { ...values };
        const id = body.id ? body.id : "";
        const method = body.id ? "put" : "post";
        if (body && Object.keys(body).length > 0) {
            await this.setState({ showBackDrop: true });
            axios[method](`${baseApiUrl}/users/${id}`, body)
                .then(async (_) => {
                    await this.setState({ showBackDrop: false });
                    toastr.success(
                        "Success",
                        "Operation carried out successfully."
                    );
                    this.setToInitalState.bind(this)();
                })
                .catch(async (e) => {
                    await this.setState({ showBackDrop: false });
                    if (e && e.response && e.response.data) {
                        toastr.error("Error", e.response.data);
                    } else if (typeof e === "string") {
                        toastr.error("Error", e);
                    } else {
                        toastr.error("Error", "Oops.. Something went wrong.");
                    }
                });
        } else {
            toastr.error("Erro", "Preencha os campos obrigatórios");
        }
    };

    remove(id) {
        axios
            .delete(`${baseApiUrl}/users/${id}`)
            .then((resp) => {
                toastr.success(
                    "Success",
                    "Operation carried out successfully."
                );
            })
            .catch((e) => {
                if (e && e.response && e.response.data) {
                    toastr.error("Error", e.response.data);
                } else if (typeof e === "string") {
                    toastr.error("Error", e);
                } else {
                    toastr.error("Error", "Oops.. Something went wrong.");
                }
            });
    }

    removeAndSetToInitialState = (_) => {
        this.remove(this.state.entityId);
        this.setToInitalState.bind(this)();
    };

    setModalVisibility = (
        modalVisibility,
        modalTitle,
        modalCrudType,
        entityId
    ) => {
        this.setState({ modalVisibility, modalTitle, modalCrudType, entityId });
    };

    setToInitalState = (_) => {
        this.setState({
            modalVisibility: false,
            modalTitle: "",
            modalCrudType: "",
            entityId: "",
        });
        this.props.setUserToInitialState();
    };

    render() {
        const { handleSubmit, classes } = this.props;
        const userColumns = [
            { title: "ID", field: "id" },
            { title: locale[this.props.locale].user.tableColumns.name, field: "name" },
            { title: "Email", field: "email" },
            { title: "Admin", field: "admin" },
        ];
        return (
            <>
                <TableView
                    localeEntity="user"
                    locale={this.props.locale}
                    model="Users"
                    columns={userColumns}
                    showActions={true}
                    field="name"
                    functions={{
                        setStateValue: this.props.setUser,
                        setModalVisibility: this.setModalVisibility.bind(this),
                    }}
                />
                <Dialog
                    maxWidth={
                        this.state.modalCrudType === "delete" ? "sm" : "md"
                    }
                    open={this.state.modalVisibility}
                    onClose={this.setToInitalState.bind(this)}
                >
                    <DialogTitle>{this.state.modalTitle}</DialogTitle>
                    <If test={this.state.modalCrudType === "delete"}>
                        <DialogContent>
                            <DialogContentText>
                                {locale[this.props.locale].user.edit.deleteMessage}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={this.setToInitalState.bind(this)}
                                style={{ color: "#363638" }}
                            >
                                {locale[this.props.locale].user.edit.cancel}
                            </Button>
                            <Button
                                onClick={this.removeAndSetToInitialState.bind(
                                    this
                                )}
                                style={{ color: "#ca0096" }}
                            >
                                {locale[this.props.locale].user.edit.delete}
                            </Button>
                        </DialogActions>
                    </If>
                    <If test={this.state.modalCrudType !== "delete"}>
                        <DialogContent>
                            <div className={classes.root}>
                                <div className={classes.paper}>
                                    <ThemeProvider theme={theme}>
                                        <form
                                            className={classes.form}
                                            noValidate
                                            onSubmit={handleSubmit(
                                                this.onSubmit
                                            )}
                                        >
                                            <UserForm locale={this.props.locale}/>
                                            <Grid
                                                container
                                                spacing={0}
                                                className={classes.submit}
                                                direction="row"
                                            >
                                                <Grid item xs={7} />
                                                <Grid item xs={3}>
                                                    <Button
                                                        style={{
                                                            color: "#363638",
                                                        }}
                                                        onClick={(e) =>
                                                            this.setToInitalState.bind(
                                                                this
                                                            )()
                                                        }
                                                    >
                                                        {locale[this.props.locale].user.edit.cancel}
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Button
                                                        type="submit"
                                                        style={{
                                                            backgroundColor:
                                                                "#ca0096",
                                                            color: "#ffffff",
                                                        }}
                                                    >
                                                        {locale[this.props.locale].user.edit.save}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </ThemeProvider>
                                </div>
                                <Backdrop
                                    className={classes.backdrop}
                                    open={this.state.showBackDrop}
                                >
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                            </div>
                        </DialogContent>
                    </If>
                </Dialog>
            </>
        );
    }
}
UserView = reduxForm({ form: "UserView", enableReinitialize: true, validate })(
    UserView
);
UserView.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
    let initialValues = { ...state.user.currentUser };
    return { initialValues };
};
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            setUserToInitialState,
            setUser,
        },
        dispatch
    );
export default compose(
    withStyles(styles, { name: "UserView", withTheme: true }),
    connect(mapStateToProps, mapDispatchToProps)
)(UserView);
