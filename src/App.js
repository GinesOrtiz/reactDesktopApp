import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import Desktop from "./component/desktop/Desktop";
import rootReducer from './reducers';

const store = createStore(rootReducer);

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Desktop/>
            </div>
        </Provider>
    );
}

export default App;
