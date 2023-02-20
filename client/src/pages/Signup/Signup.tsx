import css from './Signup.module.css';
import useSignupForm from '../../hooks/useSignupForm';
import { signUpUrl } from '../../constants/api';
import { Link } from 'react-router-dom';

const Signup = () => {

  const { loading,
    handleSubmit,
    handleInputChange,
    formData,
    success,
    error,
    formValidation } = useSignupForm(signUpUrl);

  const renderResultsAndSubmitButton = () => {
    return (
      <>
        <p className={css.errorMessage}>{formValidation?.passwordError}</p>
        {!loading && <input type="submit" className={css.signupButton} value="Sign up" />}
        {loading && <h3 className={css.loading}>Loading..</h3>}
        <p className={css.errorMessage}>{error}</p>
        {success && <p>Kontoen er opprettet! Du kan nå logge inn <Link to="/login">her</Link></p>}
      </>);
  }
  return (
    <form className={css.signupForm} onSubmit={handleSubmit}>
      <label>Email: </label>
      <input type="email"
        value={formData.email}
        name="email"
        onChange={handleInputChange}
        className={`${css.formField} & ${formValidation?.emailError && css.inputError}`} />

      <p className={css.errorMessage}>{formValidation?.emailError}</p>

      <label>Password: </label>
      <input type="password" value={formData.password}
        onChange={handleInputChange}
        name="password"
        className={`${css.formField} & 
        ${formValidation?.passwordError && css.inputError}`} />

      <label>Repeat password: </label>
      <input type="password"
        onChange={handleInputChange}
        name="repeatPassword"
        className={`${css.formField} & ${(!formValidation?.pwIsMatching) && css.inputError}`} />

      {renderResultsAndSubmitButton()}
    </form>
  )
}

export default Signup;