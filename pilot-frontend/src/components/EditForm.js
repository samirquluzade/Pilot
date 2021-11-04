import React, {useState} from "react";

const EditForm = ({users,handleSubmit,error}) => {
    const [id] = useState(users.id);
    const [name,setName] = useState(users.name);
    const [email,setEmail] = useState(users.email);
    const [admin,setAdmin] = useState(users.admin);
    return (
        <form onSubmit={e=>handleSubmit(e,id,name,email,admin)}>
            <input
                type="number"
                name="id"
                className="form-control"
                placeholder="Id"
                value={id}
                disabled
            />
            <br/>
            {error.name && <p className="red">{error.name}</p>}
            <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={e=>setName(e.target.value)}
            />
            <br/>
            {error.email && <p className="red">{error.email}</p>}
            <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={e=> setEmail(e.target.value)}
            /><br/>
            <select className="form-control" name="admin" onChange={e=> setAdmin(e.target.value)}>
                {users.admin === "0" && <><option value="0" defaultValue="False">False</option><option value="1">True</option></>}
                {users.admin === "1" && <><option value="1" defaultValue="True">True</option><option value="0">False</option></>}
            </select>
            <div className="container-button">
                <button className="button-create">Update</button>
            </div>
        </form>
    )
}
export default EditForm;