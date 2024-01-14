import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './useLoginMutation';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const userData = await login({ user, pwd }).unwrap();
            dispatch(setCredentials(...userData, user));
            setUser('');
            setPwd('');
            navigate('welcome');
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus()
        }

    }


    const handleUserInput = (e) => setUser(e.target.value);
    const handlePwdInput = (e) => setPwd(e.target.value);


    const content = isLoading ? (<h1>Loading...</h1>) : (

        <section className='login'>
            <p useRef={errRef}>{errMsg}</p>

            <h1>Employee Login</h1>

            <form onSubmit={handleLogin}>
                <label htmlFor='user'>User</label>:
                <input
                    type='text'
                    name='user'
                    onChange={handleUserInput}
                    value={user}
                    autoComplete='off'
                    useRef={userRef}
                    required
                />
                <label htmlFor='pwd'>Password</label>:
                <input
                    type='text'
                    name='pwd'
                    onChange={handlePwdInput}
                    value={pwd}
                />

                <button type='submit'>Login</button>
            </form>

        </section>

    )


    return content
}

export default Login
