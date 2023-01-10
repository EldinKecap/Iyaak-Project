import { useRef, useState } from "react";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input"
import UserCard from "./UserCard";

const GetUserForm = () => {
    const [user, setUser] = useState();
    const idRef = useRef()
    async function fetchUser() {
        const response = await fetch('http://localhost:5000/user/' + idRef.current.value);
        const data = await response.json();
        console.log(data);
        setUser(data)
    }

    return (
        <>
            <Card>
                <Input type='text' label='Enter ID' ref={idRef} />
                <Button title="submit" onClick={fetchUser} />
            </Card>
            {user && <UserCard user={user}/>}
        </>
    )
}

export default GetUserForm;