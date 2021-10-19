import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";

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
    return (
        <div className="content">
            <div className="row">
                {!isLogged && <Image />}
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="login-template">
                        <main>
                            <Route exact path="/" render={() => <Redirect to="/login" />} />
                            {!isSubmitted ? (
                                <Route path="/register">
                                    <Register submitForm={submitForm} />
                                </Route>
                            ) : (
                                <Redirect to="/login" />
                            )}
                            {!isLogged ? (
                                <Route path="/login">
                                    <Login createForm={createForm} />
                                </Route>
                            ) : (
                                <Redirect to="/user" />
                            )}
                            {isSubmitted && <Route path="/register"><Register /></Route>}
                            {isLogged && (
                                <Route path="/login">
                                    <Login />
                                </Route>
                            )}
                            <Route path="/user"><User /></Route>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Routes;
