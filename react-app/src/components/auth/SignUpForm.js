import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './Auth.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      setErrors([]);
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        console.log(data)
        setErrors(data)
      }
    } else {
      return setErrors(["error: Your passwords don't match."]);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='auth-form-cont'>
      <div>
        <form onSubmit={onSignUp}>
          <div className='auth-form-header'>
            <h2 className='auth-form-title'>Branazon</h2>
          </div>
          <div className='auth-input-div'>
            <h3 style={{margin: '0 0 10px'}}>Create An Account</h3>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error.split(':')[1]}</div>
              ))}
            </div>
            <div className='auth-input-field'>
              <label>User Name:</label>
              <input
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
                required
              ></input>
            </div>
            <div className='auth-input-field'>
              <label>Email:</label>
              <input
                type='email'
                name='email'
                onChange={updateEmail}
                value={email}
                required
              ></input>
            </div>
            <div className='auth-input-field'>
              <label>Password:</label>
              <input
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
                required
              ></input>
            </div>
            <div className='auth-input-field'>
              <label>Repeat Password:</label>
              <input
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button className='auth-button' type='submit'>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
