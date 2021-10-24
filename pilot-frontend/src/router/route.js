
import React, { useState,useEffect } from "react";
import {Route, Redirect, Switch,useHistory} from "react-router-dom";
import Image from "../components/image";
import Login from "../screens/LoginScreen";
import Register from "../screens/RegisterScreen";
import User from "../screens/UserScreen";

const Routes = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLogged, setIsLogged] = useState(false);

    const tokenUser = localStorage.getItem('tokenUser');
    const tokenAdmin = localStorage.getItem('tokenAdmin');

    const submitForm = () => {
        setIsSubmitted(true);

        setTimeout(() => {
            setIsSubmitted(false);
        },1000)
    };

    const createForm = () => {
        setIsLogged(true);
    };

    const logoutHandler = (function() {
        if(tokenUser === null){
            localStorage.removeItem('tokenAdmin');
            setIsSubmitted(false);
        }
        else if(tokenAdmin === null){
            localStorage.removeItem('tokenUser');
            setIsSubmitted(false);
        }
        setIsLogged(false);
    });

    const history = useHistory();
    useEffect(() => {
        if(tokenUser || tokenAdmin) {
            setIsLogged(true);
            history.push('/user');
        }
    },[history,tokenAdmin,tokenUser]);
    return (
        <div className="content">
            <div className="row">
                {isLogged && <User logoutHandler={logoutHandler}/>}
                {!isLogged && <Image />}
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="login-template">
                        <main>
                            <Switch>
                                <Route exact path="/" render={() => <Redirect to="/login" />} />
                                {!isLogged ? (
                                    <Route path="/login">
                                        <Login createForm={createForm}/>
                                    </Route>
                                ) : (
                                    <Redirect to="/user" />
                                )}
                                {!isSubmitted ? (
                                    <Route path="/register">
                                        <Register submitForm={submitForm}/>
                                    </Route>
                                ) : (
                                    <Redirect to="/login"/>
                                )}
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

