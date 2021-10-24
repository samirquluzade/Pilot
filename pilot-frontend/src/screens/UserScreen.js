import React,{useEffect,useState} from "react";
import axios from 'axios';

export default function User({logoutHandler}) {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);

    const tokenUser = localStorage.getItem('tokenUser');

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
    return(
        <div className="container">
            <div className="row">
                    {tokenUser === null && (
                <div className="col-lg-11">
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
                                    </tr>
                                )) : null}
                            </tbody>
                        </table>
                    </div>
                </div>)}
                <div className="col-lg-1">
                    <button className="btn btn-danger" onClick={logoutHandler}>Logout</button>
                </div>
            </div>
        </div>
    );
}
