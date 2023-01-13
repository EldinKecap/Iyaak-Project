import {  useEffect, useState } from "react";
import UserCard from "./UserCard";

const GetUser = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedInUser')).user);
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('loggedInUser')).user)
    },[])
    console.log(user);
    return (
        <>
            {user && <UserCard user={user} />}
        </>
    )
}

export default GetUser;