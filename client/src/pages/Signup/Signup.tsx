import css from './Signup.module.css';
import Container from '@wom/Container/Container';
import Button from '@wom/Button/Button';
import useSignupForm from '../../hooks/useSignupForm';
import { signUpUrl } from '../../constants/api';
import { Link } from 'react-router-dom';
import FormCard from '@wom/FormCard/FormCard';
import EmailInput from '@wom/FormCard/EmailInput';
import PasswordInput from '@wom/FormCard/PasswordInput';

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
    <Container justifyContent="center">
      <section className={css.signupContainer}>
        <FormCard title="Sign up">
          <form onSubmit={handleSubmit}>
            <EmailInput error={emailError} onChange={handleInputChange} />
            <PasswordInput error={passwordError} onChange={handleInputChange} />
            <Button loading={loading} variant='gradient'>Sign up</Button>

            {error && <p>*{error}</p>}
            {success && <p>Brukeren din er opprettet!
              <Link to="/login">Klikk her</Link> for å logge inn</p>}
          </form>
        </FormCard>
      </section>
    </Container>

  );
}

export default Signup;