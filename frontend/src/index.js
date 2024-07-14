import ReactDOM from "react-dom";
import React from "react";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import promise from "redux-promise";
import multi from "redux-multi";
import thunk from "redux-thunk";
import reducers from "./main/reducers";
import AuthOrApp from "./main/AuthOrApp";
import reportWebVitals from "./reportWebVitals";
import serviceWorker from "./serviceWorker";

const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers);
ReactDOM.render(
    <Provider store={store}>
        <AuthOrApp />
    </Provider>,
    document.getElementById("app")
);
reportWebVitals();
serviceWorker();
