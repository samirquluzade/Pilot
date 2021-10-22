import React, { useState,useEffect } from "react";
import {Route, Redirect, Switch,useHistory} from "react-router-dom";

import Image from "../components/image";
import Login from "../screens/LoginScreen";
import Register from "../screens/RegisterScreen";
import User from "../screens/UserScreen";

const Routes = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLogged, setIsLogged] = useState(false);

    const submitForm = () => {
        setIsSubmitted(true);
    };

    const createForm = () => {
        setIsLogged(true);
    };

    // const history = useHistory();
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if(!token) {
    //         history.push('/login');
    //     }
    // });
    return (
        <div className="content">
            <div className="row">
                {isLogged && <User />}
                {!isLogged && <Image />}
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="login-template">
                        <main>
                            <Switch>
                                <Route exact path="/" render={() => <Redirect to="/login" />} />
                                {!isLogged ? (
                                    <Route path="/login">
                                        <Login createForm={createForm} />
                                    </Route>
                                ) : (
                                    <Redirect to="/user" />
                                )}
                                {!isSubmitted ? (
                                    <Route path="/register">
                                        <Register submitForm={submitForm} />
                                    </Route>
                                ) : (
                                    <Redirect to="/login" />
                                )}

                                {isSubmitted && <Route path="/register"><Register /></Route>}
                                 <Route path="/login"><Login /></Route>
                                {!isLogged && <Route exact path="/:type" render={() => <Redirect to="/login" />} />}
                            </Switch>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Routes;
