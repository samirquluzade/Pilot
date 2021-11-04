import React,{useEffect,useState} from "react";
import axios from 'axios';
import {Modal,Button} from "react-bootstrap";

import EditForm from "../components/EditForm";

export default function User({logoutHandler,addUserHandler}) {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const [refresh,setRefresh] = useState(false);
    const [show,setShow] = useState(false);
    const [user,setUser] = useState('');
    const [error,setError] = useState({});

    const tokenUser = localStorage.getItem('tokenUser');
    const tokenAdmin = localStorage.getItem('tokenAdmin');

    useEffect(() => {
        const renderData = async() => {
            setLoading(true);
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
                if (res.data.status === 200) {
                    setData(res.data.users);
                }
            }
            catch (err){
                console.log(err.message);
            }
            setLoading(false);
        }
        renderData();
        setRefresh(false);
    },[refresh]);

    const deleteHandler = async(id) => {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/delete/${id}`,{
            headers:{
                'authorization':tokenAdmin
            }
        });
        if(res.data.status === 202){
            setRefresh(true);
        }
    }
    const handleSubmit = async(e,id,name,email,admin) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/update/${id}`, {
                name: name,
                email: email,
                admin:admin
            });
            if (res.data.status === 201) {
                setRefresh(true);
                setShow(false);
                setError({});
            }
        }
        catch(err){
            if(name.trim() === ""){
                setError({...error,name:'Name is required!'});
            }
            if(email.trim() === ""){
                setError({...error,email:'Email is required!'});
            }
            if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
                setError({...error,email:'Email is not correct!'});
            }
        }
    }
    const editHandler = (item) => {
        setShow(true);
        setUser(item);
        // return users;
    }
    const handleClose = () => {
        setShow(false);
    }
    return(
        <div className="container">
            <div className="row">
                {tokenUser === null && (
                    <div className="col-lg-9">
                        <div className="table-responsive-md">
                            <table className="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    {loading ? <td>Loading</td> : null}
                                </tr>
                                {!loading ? data.map((item) => (
                                    <>
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.admin}</td>
                                            <td className="text-center"><button className="btn btn-primary" onClick={() => editHandler(item)} data-toggle="modal">Edit</button></td>
                                            <td className="text-center"><button className="btn btn-danger" onClick={() => deleteHandler(item.id)}>Delete</button></td>
                                        </tr>
                                    </>
                                )) : null}
                                {show && (<Modal show={show} onHide={handleClose}>
                                    <Modal.Header>
                                        <Modal.Title>Edit User</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {user!=='' && <EditForm users={user} handleSubmit={handleSubmit} error={error}/>}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                                    </Modal.Footer>
                                </Modal>)}
                                </tbody>
                            </table>
                        </div>
                    </div>)}
                <div className="col-lg-3">
                    {tokenUser === null && <button className="btn btn-success" onClick={addUserHandler}>Add new user</button>}&nbsp;
                    <button className="btn btn-warning" onClick={logoutHandler}>Logout</button>
                </div>
            </div>
        </div>
    );
}