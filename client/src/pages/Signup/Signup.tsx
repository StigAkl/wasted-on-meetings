import css from './Signup.module.css';
import Container from '../../components/Container/Container';
import Button from '../../components/Button/Button';
import useSignupForm from '../../hooks/useSignupForm';
import { signUpUrl } from '../../constants/api';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const Signup = () => {

  const { formData,
    handleInputChange,
    handleSubmit,
    results,
    loading,
    error,
    success,
    formValidation } = useSignupForm(signUpUrl);

  const emailInputClassNames = classNames(formValidation.emailError ? css.error : "");
  const passwordInputClassNames = classNames(formValidation.passwordError ? css.error : "");

  console.log(formValidation);
  return (
    <Container variant='gradient'>
      <article className={css.loginForm}>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <input className={emailInputClassNames} type="email" name="email"
            onChange={handleInputChange} placeholder="Email" value={formData.email} />

          <input className={passwordInputClassNames} type="password" name="password"
            onChange={handleInputChange} placeholder="Password" value={formData.password} />
          <Button loading={loading} >Sign up</Button>
          {error && <p className={css.signupError}>*{error}</p>}
          {success && <p>Brukeren din er opprettet! <Link to="/login">Klikk her</Link> for å logge inn</p>}
        </form>
      </article>
    </Container>
  )
}

export default Signup;