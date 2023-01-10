import { useEffect, useState } from "react"
import UserCard from "../GetUserForm/UserCard";

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
    

    return (<>
        {
            users.map((user) => {
                return <UserCard user={user} />
            })
        }
        </>
    )
}

export default GetAllUsers