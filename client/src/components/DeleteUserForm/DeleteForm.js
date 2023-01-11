import { useRef } from "react";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input"

const DeleteUserForm = () => {
    const idRef = useRef()
    async function fetchUser() {
        const url = 'http://localhost:5000/user/' + idRef.current.value
        const response = await fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <>
            <Card>
                <h2>Delete User</h2>
                <Input type='text' label='Enter ID' ref={idRef} />
                <Button title="Submit" onClick={fetchUser} />
            </Card>
        </>
    )
}

export default DeleteUserForm;