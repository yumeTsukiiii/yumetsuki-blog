import { BrowserRouter, Route } from "react-router-dom";
import React from "react";

import Main from '../pages/main/main'
import Mine from '../pages/mine/mine'

function mainRouter() {
    return (
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Main}/>
                <Route path="/mine" component={Mine}/>
            </div>
        </BrowserRouter>
    );
}

export default mainRouter