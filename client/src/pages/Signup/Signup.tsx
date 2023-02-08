import css from './Signup.module.css';
import useHandleSubmit from '../../hooks/useHandleSubmit';
import { signUpUrl } from '../../constants/api';

const Signup = () => {

  const { loading,
    handleSubmit,
    handleInputChange,
    formData,
    success,
    error,
    results } = useHandleSubmit(signUpUrl);

  if (loading) {
    return <h3>Loading..</h3>
  }


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

      <input type="submit" className={css.signupButton} value="Sign up" />

      <p className={css.errorMessage}>{error}</p>
      {success && <p>Kontoen er opprettet</p>}
    </form>
  )
}

export default Signup;