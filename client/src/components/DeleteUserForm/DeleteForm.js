import { useRef } from "react";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input"

const DeleteUserForm = () => {
    const idRef = useRef()
    async function fetchUser() {
        const response = await fetch('http://localhost:5000/user/' + idRef.current.value, {
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
                <Input type='text' label='Enter ID' ref={idRef} />
                <Button title="submit" onClick={fetchUser} />
            </Card>
        </>
    )
}

export default DeleteUserForm;