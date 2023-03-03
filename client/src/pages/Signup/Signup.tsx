import css from './Signup.module.css';
import Container from '../../components/Container/Container';
import Button from '../../components/Button/Button';
import useSignupForm from '../../hooks/useSignupForm';
import { signUpUrl } from '../../constants/api';

const Signup = () => {

  const { formData,
    handleInputChange,
    handleSubmit,
    formValidation } = useSignupForm(signUpUrl);

  return (
    <Container variant='gradient'>
      <article className={css.loginForm}>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username"
            onChange={handleInputChange} placeholder="Username" value={formData.username} />
          <input type="password" name="password"
            onChange={handleInputChange} placeholder="Password" value={formData.password} />
          <Button>Sign up</Button>
        </form>
      </article>
    </Container>
  )
}

export default Signup;