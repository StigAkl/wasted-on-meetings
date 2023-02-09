import css from './Signup.module.css';
import useHandleSubmit from '../../hooks/useHandleSubmit';
import { signUpUrl } from '../../constants/api';
import { useContext } from 'react';
import { UserDetailsContext } from '../../state/context/UserDetailsProvider';
import { Link } from 'react-router-dom';

const Signup = () => {

  const { loading,
    handleSubmit,
    handleInputChange,
    formData,
    success,
    error } = useHandleSubmit(signUpUrl);


  const { setUser } = useContext(UserDetailsContext);


  return (
    <form onSubmit={handleSubmit}>
      <label>Email: </label>
      <input type="text"
        value={formData.email}
        name="email"
        onChange={handleInputChange}
        className={css.formField} />

      <label>Password: </label>
      <input type="password" value={formData.password}
        onChange={handleInputChange}
        name="password"
        className={css.formField} />

      <label>Repeat password: </label>
      <input type="password"
        onChange={handleInputChange}
        className={css.formField} />

      {!loading && <input type="submit" className={css.signupButton} value="Sign up" />}
      {loading && <h3 className={css.loading}>Loading..</h3>}
      <p className={css.errorMessage}>{error}</p>
      {success && <p>Kontoen er opprettet! Du kan nå logge inn <Link to="/login">her</Link></p>}
    </form>
  )
}

export default Signup;