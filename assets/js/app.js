import React from "react";
import ReactDOM from "react-dom";
import {MemoryRouter} from 'react-router-dom';

import App from "./components/App";
import {Provider} from "react-redux";
import store from "./store";
import {setUserName} from "./actions/conversation";

store.dispatch(setUserName(document.querySelector('#app').dataset.username));

ReactDOM.render((
        <Provider store={store}>
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        </Provider>
    ),
    document.querySelector("#app")
);