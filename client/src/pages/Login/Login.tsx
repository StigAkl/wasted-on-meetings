import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import css from './Login.module.css';
import { UserDetailsContext } from "../../state/context/UserDetailsProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authUrl } from "../../constants/api";
import { clearStorage, setTokens } from "../../utils/token";
import FormCard from "@wom/FormCard/FormCard";
import EmailInput from "@wom/FormCard/EmailInput";
import PasswordInput from "@wom/FormCard/PasswordInput";
import Container from "@wom/Container/Container";
import Button from "@wom/Button/Button";

const Login = () => {

  const { user, setUser, fetchDetails } = useContext(UserDetailsContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUser(undefined);
      clearStorage();
    }
  }, [])

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const performLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(authUrl, {
        email,
        password
      })

      if (response.status === 200) {
        setTokens(response.data.data);
        setUser({
          email: email,
          token: response.data.accessToken
        });

        await fetchDetails();

        navigate('/')
      }
    } catch (err: any) {
      setError("Wrong username / password");
    } finally {
      setLoading(false);
    }
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    performLogin();
  }

  return (
    <Container justifyContent="center">
      <section className={css.loginContainer}>
        <FormCard title="Login">
          <form onSubmit={handleSubmit}>
            <EmailInput onChange={handleEmailChange} />
            <PasswordInput onChange={handlePasswordChange} />
            <Button loading={loading} variant='gradient'>Login</Button>
          </form>
        </FormCard>
      </section>
    </Container>
  )
};

export default Login;