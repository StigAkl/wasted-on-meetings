import { FormEvent, useState } from "react";
import axios from 'axios';
import { authUrl } from "../constants/api";

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

    console.log(response.data.data);
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      </div>
      <div>
        <input type="submit" value="Login" />
      </div>
    </form>
  )
};

export default Login;