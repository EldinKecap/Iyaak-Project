import { useEffect, useRef, useState } from "react";
import generateUserError from "../../validation/generateUserError";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";


const UpdateUserForm = () => {
    const [invalidInput, setInvalidInput] = useState({})
    const [successUpdate, setSuccessUpdate] = useState(false)

    let id = JSON.parse(localStorage.getItem('loggedInUser')).user._id
    let firstNameRef = useRef();
    let lastNameRef = useRef();
    let usernameRef = useRef();
    let emailRef = useRef();
    let passwordRef = useRef();

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        let user = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        console.log(id, user);
        const url = 'http://localhost:5000/user/' + id
        let response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        let data = await response.json()
        console.log(data);
        let errorMessage = {}
        if (Object.keys(data).includes('errorMessage')) {
            console.log(errorMessage);
            errorMessage = data.errorMessage
            setInvalidInput(errorMessage)
        } else {
            localStorage.setItem('loggedInUser', JSON.stringify({ user: data }));
            setSuccessUpdate(true)
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSuccessUpdate(false)
        }, 3000);

        return () => {
            clearTimeout(timeout);
        }
    }, [successUpdate])
   
    useEffect(() => {
        const timeout = setTimeout(() => {
            setInvalidInput({})
        }, 5000);

        return () => {
            clearTimeout(timeout);
        }
    }, [setInvalidInput])

    return (
        <Card>
            <form onSubmit={formSubmitHandler}>
                <h1>Update profile</h1>
                <Input ref={firstNameRef} label="First Name" id="firstName" type="text" />
                {invalidInput.firstName && <p>{invalidInput.firstName}</p>}
                <Input ref={lastNameRef} label="Last Name" id="lastName" type="text" />
                {invalidInput.lastName && <p>{invalidInput.lastName}</p>}

                <Input ref={usernameRef} label="Username" id="username" type="text" />
                {invalidInput.username && <p>{invalidInput.username}</p>}

                <Input ref={emailRef} label="E-mail" id="email" type="email" />
                {invalidInput.email && <p>{invalidInput.email}</p>}

                <Input ref={passwordRef} label="Password" id="password" type="password" />
                {invalidInput.password && <p>{invalidInput.password}</p>}
                {successUpdate && <p>Update successful</p>}
                <Button title="Submit" />
            </form>
        </Card>
    )
}

export default UpdateUserForm;