import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import { sendData } from '../../utils/http';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  // gauti isLogged in is context
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=';
  useEffect(() => {
    (async () => {
      const data = await sendData(url, { idToken: authCtx.token });
      console.log('data', data.users[0].email);
    })();
  }, []);

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={authCtx.logout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
// paspaudus logout ivygdyti logout funkija is konteksto ir
// nunaviguoti i auth komponenta

export default MainNavigation;
