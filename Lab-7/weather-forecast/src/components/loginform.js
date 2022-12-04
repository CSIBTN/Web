import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

import './loginform.css'

const LoginForm = () => {
    const username = "Ivan4"
    const password = "12345"


    const [cookies, setCookies] = useCookies(['user'])
    const navigate = useNavigate()

    useEffect(() => {
        console.log(cookies.username)
        if (cookies.username == username && cookies.password == password) {
            navigate("/weather")
        }
    }, [])

    const userNamePassed = useRef(null)
    const passwordPassed = useRef(null)


    const [popUpStyle, showPopUp] = useState("hiding")

    const errorPopUp = () => {
        if (validate()) {
            setCookies('username', userNamePassed.current.value, { path: "/" })
            setCookies('password', passwordPassed.current.value, { path: "/" })
            setCookies('isLoggedIn', true, { path: "/" })
            navigate("/weather")
        } else {
            showPopUp("error-popup")
            setTimeout(() => showPopUp("hiding")
                , 1500)
        }
    }

    function validate() {
        if (username == userNamePassed.current.value && password == passwordPassed.current.value)
            return true
        return false
    }


    return (
        <section className='loginContainer'>
            <section className='login'>
                <input ref={userNamePassed}
                    type="text" placeholder='username' required></input>
                <input ref={passwordPassed}
                    type="password" placeholder='password' required></input>
                <div onClick={errorPopUp} className='login-button'>Login</div>

                <div className={popUpStyle}>
                    <h3>Login Failed</h3>
                    <h3>Username or Password is wrong!</h3>
                </div>
            </section>
        </section>
    )
}

export default LoginForm