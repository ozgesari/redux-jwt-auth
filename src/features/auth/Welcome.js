import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';
import { selectCurrentUser } from './authSlice';
import { Link } from 'react-router-dom';

const Welcome = () => {
    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectCurrentToken);

    const tokenAbbrv = token ? token.slice(0, 10) : '';

    const welcome = user ? `Welcome ${user}` : 'Welcome';
    const content = (
        <section className='welcome'>
            <h1>{welcome}</h1>
            <p>Token : {tokenAbbrv}</p>
            <p><Link to="usersList" /></p>
        </section>
    )

    return content;
}

export default Welcome
