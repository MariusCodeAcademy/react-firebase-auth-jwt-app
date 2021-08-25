import axios from 'axios';
import { useState } from 'react';

import classes from './AuthForm.module.css';
import { apiKey } from '../../config';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log('sending');

    // paimti email ir password ir siusti i endpoint
    // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

    if (isLogin) {
      // Prijungti esama vartotoja
      console.log('Login action');
      return;
    }
    if (!isLogin) {
      // SUkurti vartotja
      const url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        apiKey;
      console.log('Sign up action');
      console.log(enteredEmail, enteredPassword);
      // galima validacija
      const response = await axios.post(url, {
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      });
      console.log('response', response);
      return;
    }
    // gauti email ir slaptazodi ir pateikti issiuntimu
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input
            type='email'
            id='email'
            required
            value={enteredEmail}
            onChange={(event) => setEnteredEmail(event.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            minLength='6'
            value={enteredPassword}
            onChange={(event) => setEnteredPassword(event.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
