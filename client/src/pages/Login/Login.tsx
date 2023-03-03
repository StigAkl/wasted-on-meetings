import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import css from './Login.module.css';
import { UserDetailsContext } from "../../state/context/UserDetailsProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authUrl } from "../../constants/api";
import { clearStorage, setTokens } from "../../utils/token";
import FormCard from "../../components/FormCard/FormCard";
import EmailInput from "../../components/FormCard/EmailInput";
import PasswordInput from "../../components/FormCard/PasswordInput";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";

const Login = () => {

  const { user, setUser, fetchDetails } = useContext(UserDetailsContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUser(undefined);
      clearStorage();
    }
  }, [])

  const [email, setEmail] = useState('kake@kake.no');
  const [password, setPassword] = useState('Kake123!');
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
    setPassword(password);
  };


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    performLogin();
  }

  return (
    <Container variant='gradient'>
      <FormCard title="Login">
        <form onSubmit={handleSubmit}>
          <EmailInput onChange={handleEmailChange} />
          <PasswordInput onChange={handlePasswordChange} />
          <Button loading={loading}>Login</Button>
        </form>
      </FormCard>
    </Container>
  )
};

export default Login;