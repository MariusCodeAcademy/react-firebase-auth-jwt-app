import classes from './ProfileForm.module.css';
import { useState, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { sendData } from '../../utils/http';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  // gauti input reiksme
  const [newPassword, setNewPassword] = useState('');

  // perimti formos valdyma
  const submitHandler = async (e) => {
    e.preventDefault();
    // galima validacija
    console.log('new pass is ', newPassword);

    // issiusti POST request
    //https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]
    const { idToken: token } = await sendData(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=',
      {
        idToken: authCtx.token,
        password: newPassword,
        returnSecureToken: true,
      }
    );
    if (token) {
      history.push('/');
    }
    console.log('token after pass change', token);
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type='password'
          id='new-password'
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
