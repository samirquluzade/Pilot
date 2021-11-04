
import React, { useState,useEffect } from "react";
import {Route, Redirect, Switch,useHistory} from "react-router-dom";
import axios from 'axios';
import Image from "../components/image";
import Login from "../screens/LoginScreen";
import Register from "../screens/RegisterScreen";
import User from "../screens/UserScreen";
import AddUser from "../screens/AddUserScreen";

const Routes = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [isNewUser,setIsNewUser] = useState(false);
    const [isReadOnly,setIsReadOnly] = useState(false);

    const tokenUser = localStorage.getItem('tokenUser');
    const tokenAdmin = localStorage.getItem('tokenAdmin');

    const submitForm = () => {
        setIsSubmitted(true);
    };
    const submittingForm = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
        },1000)
    }

    const createForm = () => {
        setIsLogged(true);
    };

    const logoutHandler = (function() {
        if(tokenUser === null){
            localStorage.removeItem('tokenAdmin');
            setIsSubmitted(false);
            setIsLogged(false);
        }
        else if(tokenAdmin === null){
            localStorage.removeItem('tokenUser');
            setIsSubmitted(false);
            setIsLogged(false);
        }
        setIsLogged(false);
    });
    const history = useHistory();

    const addUserHandler = () => {
        setIsReadOnly(false);
        history.push('/adduser');
        setIsNewUser(true);
    }
    useEffect(() => {
        if(tokenUser || tokenAdmin) {
            setIsLogged(true);
            setIsReadOnly(true);
            history.push('/user');
        }
    },[history,tokenAdmin,tokenUser]);
    let myClass = isNewUser ? 'col-lg-4 new-class col-md-6 col-12' : 'col-lg-4 col-md-6 col-12';
    return (
        <div className="content">
            <div className="row">
                {isLogged && isReadOnly && <User logoutHandler={logoutHandler} addUserHandler={addUserHandler}/>}
                {isLogged && isSubmitted && <User logoutHandler={logoutHandler} addUserHandler={addUserHandler}/>}
                {!isLogged && <Image />}
                <div className={myClass}>
                    <div className="login-template">
                        <main>
                            <Switch>
                                {isLogged && isNewUser && <Route path="/adduser"><AddUser logoutHandler={logoutHandler} submitForm={submitForm}/></Route>}
                                <Route exact path="/" render={() => <Redirect to="/login" />} />
                                {!isLogged ? (
                                    <Route path="/login">
                                        <Login createForm={createForm}/>
                                    </Route>
                                ) : (
                                    <Redirect to="/user" />
                                )}
                                {!isSubmitting ? (
                                    <Route path="/register">
                                        <Register submittingForm={submittingForm}/>
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

