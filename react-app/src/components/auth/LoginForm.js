import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='auth-form-cont'>
      <form onSubmit={onLogin}>
          <div className='auth-form-header'>
            <h2 className='auth-form-title'>Branazon</h2>
          </div>
          <div className='auth-input-div'>
            <h3 style={{margin: '0 0 10px'}}>Log In To Your Account</h3>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error.split(':')[1]}</div>
              ))}
            </div>
            <div className='auth-input-field'>
              <label htmlFor='email'>Email:</label>
              <input
                name='email'
                type='email'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className='auth-input-field'>
              <label htmlFor='password'>Password:</label>
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
              <button className='auth-button clickable' type='submit'>Login</button>
              <button className='auth-button-2 clickable' onClick={demoLogin}>Demo Login</button>
            </div>
          </div>
      </form>
    </div>
  );
};

export default LoginForm;
