import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import React from "react";

import Main from '../pages/main/main'
import Mine from '../pages/mine/mine'
import YuzuAuth from "../pages/yuzu-auth/YuzuAuth";

function mainRouter() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route exact path="/" component={YuzuAuth}/>
                <Route path="/main" component={Main} />
                <Route path="/mine" component={Mine}/>
                <Redirect to="/"/>
            </Switch>
        </BrowserRouter>
    );
}

export default mainRouter