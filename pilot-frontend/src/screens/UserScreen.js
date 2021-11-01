import React,{useEffect,useState} from "react";
import {useHistory} from "react-router-dom";
import axios from 'axios';

export default function User({logoutHandler,addUserHandler}) {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);

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
    },[]);

    const deleteHandler = async(id) => {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/delete/${id}`,{
            headers:{
                'authorization':tokenAdmin
            }
        });
        return res.data;
    }
    const editHandler = async(id) => {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/update/${id}`,{
            headers:{
                'authorization':tokenAdmin
            }
        });
        return res.data;
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
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.admin}</td>
                                        <td className="text-center"><button className="btn btn-primary" onClick={() =>editHandler(item.id)}>Edit</button></td>
                                        <td className="text-center"><button className="btn btn-danger" onClick={() => deleteHandler(item.id)}>Delete</button></td>
                                    </tr>
                                )) : null}
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
