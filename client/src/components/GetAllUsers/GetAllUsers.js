import { useEffect, useState } from "react"
import UserCard from "../GetUser/UserCard";
import classes from "./GetAllUsers.module.css"

const GetAllUsers = () => {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/user')
        .then(response => response.json())
        .then(data => {
            setUsers(data)
            console.log(data);
        })
    },[])
    

    return (<div className={classes.userList}>
        {
            users.map((user) => {
                return <UserCard key={user._id} user={user} />
            })
        }
        </div>
    )
}

export default GetAllUsers