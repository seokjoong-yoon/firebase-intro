import React, {useState} from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Home from '../routes/Home'
import Auth from '../routes/Auth'
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

const AppRouter = (props) => {
    return(
        <Router>
            {props.isLoggedIn && <Navigation />}
            <Switch>
                {
                    props.isLoggedIn ?
                        (
                            <>
                                <Route exact path="/">
                                    <Home userObj={props.userObj} />
                                </Route>
                                <Route exact path="/profile">
                                    <Profile />
                                </Route>
                            </>
                        ):
                        (
                            <>
                                <Route exact path="/">
                                    <Auth />
                                </Route>
                            </>
                        )
                }
            </Switch>
        </Router>
    )
}

export default AppRouter