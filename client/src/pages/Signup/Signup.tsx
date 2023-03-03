import css from './Signup.module.css';
import Container from '../../components/Container/Container';
import Button from '../../components/Button/Button';
import useSignupForm from '../../hooks/useSignupForm';
import { signUpUrl } from '../../constants/api';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import FormCard from '../../components/FormCard/FormCard';
import EmailInput from '../../components/FormCard/EmailInput';
import PasswordInput from '../../components/FormCard/PasswordInput';

const Signup = () => {

  const {
    handleInputChange,
    handleSubmit,
    results,
    loading,
    error,
    success,
    formValidation } = useSignupForm(signUpUrl);

  const emailError = formValidation.emailError ? true : false;
  const passwordError = formValidation.passwordError ? true : false;

  return (
    <Container variant='gradient'>
      <FormCard title="Sign up">
        <form onSubmit={handleSubmit}>
          <EmailInput error={emailError} onChange={handleInputChange} />
          <PasswordInput error={passwordError} onChange={handleInputChange} />
          <Button loading={loading} >Sign up</Button>

          {error && <p className={css.signupError}>*{error}</p>}
          {success && <p>Brukeren din er opprettet!
            <Link to="/login">Klikk her</Link> for å logge inn</p>}
        </form>
      </FormCard>
    </Container>

  );
}

export default Signup;