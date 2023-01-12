import {  useState } from "react";
import UserCard from "./UserCard";

const GetUser = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedInUser')).user);
    return (
        <>
            {user && <UserCard user={user} />}
        </>
    )
}

export default GetUser;