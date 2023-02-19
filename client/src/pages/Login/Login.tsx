import { FormEvent, useContext, useEffect, useState } from "react";
import css from './Login.module.css';
import { UserDetailsContext } from "../../state/context/UserDetailsProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authUrl } from "../../constants/api";
import { clearStorage, setTokens } from "../../utils/token";

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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    performLogin()
  };

  const performLogin = async () => {
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
    }
  }

  return (
    <form className={css.login} onSubmit={onSubmit}>
      <div>
        <label>Email</label>
        <input className={css.formField} type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      </div>
      <div>
        <label>Password</label>
        <input className={css.formField} type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      </div>
      <div>
        <input className={css.button} type="submit" value="Login" />
      </div>

      <p className={css.errorText}>{error}</p>
    </form>
  )
};

export default Login;