import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import App from "./App";
import Auth from "../auth/Auth";
import { validateToken } from "../auth/authActions";
class AuthOrApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locale: 'pt',
        };
    }
    componentDidMount() {
        if (this.props.auth.user) {
            this.props.validateToken(this.props.auth.user.token);
        }
    }

    setLocale = (locale) => {
        this.setState({ locale });
    }

    render() {
        const { user, validToken } = this.props.auth;
        if (user && validToken) {
            axios.defaults.headers.common["Authorization"] = `bearer ${user.token}`;
            axios.defaults.headers.common["locale"] = this.state.locale;
            return (
                <App locale={this.state.locale} setLocale={this.setLocale.bind(this)} user={{ admin: user.admin }}>{this.props.children}</App>
            );
        } else if (!user && !validToken) {
            return <Auth locale={this.state.locale}/>;
        } else {
            return false;
        }
    }
}

const mapStateToProps = (state) => ({ auth: state.auth });
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ validateToken }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AuthOrApp);
