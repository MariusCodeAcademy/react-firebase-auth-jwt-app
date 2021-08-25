import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  // gauti input reiksme

  // perimti formos valdyma

  // issiusti POST request
  //https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
