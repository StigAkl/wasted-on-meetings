import { FormEvent, useContext, useState } from "react";
import axios from 'axios';
import { authUrl } from "../../constants/api";
import css from './Login.module.css';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    performLogin()
  };

  const performLogin = async () => {
    const response = await axios.post(authUrl, {
      email,
      password
    })
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
    </form>
  )
};

export default Login;