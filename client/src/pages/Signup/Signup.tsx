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
        {!loading && (
          <div className={css.buttonGroup}>
            <input type="submit" className={css.signupButton} value="Sign up" />
            <Link to="/login">Login</Link>
          </div>
        )}
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
      <label>Password: </label>
      <input type="password" value={formData.password}
        onChange={handleInputChange}
        name="password"
        className={`${css.formField} & 
        ${formValidation?.passwordError && css.inputError}`} />

      {renderResultsAndSubmitButton()}

      <p className={css.errorMessage}>{formValidation?.emailError}</p>
    </form>
  )
}

export default Signup;