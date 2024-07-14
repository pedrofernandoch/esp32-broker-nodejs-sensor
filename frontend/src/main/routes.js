import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import TempHumView from "../temp-hum/TempHumView";
import UserView from "../user/UserView";
import LogView from "../log/LogView";
import Unauthorized from "../common/components/Unauthorized";

export default function Routes(props) {
    const getUserComponent = () => {
        if (props.user.admin) {
            return <UserView locale={props.locale}></UserView>;
        } else {
            return <Unauthorized locale={props.locale}></Unauthorized>;
        }
    };

    const getLogComponent = () => {
        if (props.user.admin) {
            return <LogView locale={props.locale}></LogView>;
        } else {
            return <Unauthorized locale={props.locale}></Unauthorized>;
        }
    };

    return (
        <div className="content-wrapper">
            <Switch>
                <Route
                    exact
                    path="/"
                    element={<TempHumView locale={props.locale}></TempHumView>}
                />
                <Route path="/users" element={getUserComponent()} />
                <Route path="/logs" element={getLogComponent()} />
            </Switch>
        </div>
    );
}
