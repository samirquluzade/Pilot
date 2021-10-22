import React,{useEffect,useState} from "react";
import axios from 'axios';

export default function User() {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const renderData = async() => {
            setLoading(true);
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/users');
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
                <div className="col-lg-12">
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
                            {loading && <span>Loading</span>}
                            {!loading && data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.admin}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
