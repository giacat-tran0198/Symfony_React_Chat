import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, MemoryRouter} from 'react-router-dom';

import App from "./components/App";
import {Provider} from "react-redux";
import store from "./store";

ReactDOM.render((
        <Provider store={store}>
            <MemoryRouter>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </MemoryRouter>
        </Provider>
    ),
    document.querySelector("#app")
);