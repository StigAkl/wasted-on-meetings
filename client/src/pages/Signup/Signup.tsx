import css from './Signup.module.css';

const Signup = () => {
  return (
    <form>
      <label>Email: </label>
      <input type="text" className={css.formField} />
      <label>Password: </label>
      <input type="password" className={css.formField} />
      <label>Repeat password: </label>
      <input type="password" className={css.formField} />

      <input type="submit" className={css.signupButton} value="Sign up" />
    </form>
  )
}

export default Signup;