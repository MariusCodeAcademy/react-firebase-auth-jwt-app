import axios from 'axios';
import { useContext, useState } from 'react';

import classes from './AuthForm.module.css';
import { apiKey } from '../../config';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    // setIsLogin(!isLogin);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log('sending');
    setIsLoading(true);

    // paimti email ir password ir siusti i endpoint
    // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
    let url;
    if (isLogin) {
      // Prijungti esama vartotoja
      console.log('Login action');
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        apiKey;
    }
    if (!isLogin) {
      // SUkurti vartotja
      console.log('Sign up action');
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        apiKey;
      console.log(enteredEmail, enteredPassword);
      // galima validacija
    }
    try {
      const response = await axios.post(url, {
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      });
      console.log('response OK', response.data.idToken);
      // Sekmingo atsakymo vieta
      // ivygdyti login metoda paduodant token
      authCtx.login(response.data.idToken);
    } catch (error) {
      console.log('Catch block');
      console.log(error.response.data.error.message);
      alert('Error: ' + error.response.data.error.message);
    }

    setIsLoading(false);

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
            minLength='3'
            value={enteredPassword}
            onChange={(event) => setEnteredPassword(event.target.value)}
          />
        </div>
        <div className={classes.actions}>
          {isLoading ? (
            <button disabled>Loading...</button>
          ) : (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
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
