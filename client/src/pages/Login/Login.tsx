import { FormEvent, useContext, useEffect, useState } from "react";
import css from './Login.module.css';
import { UserDetailsContext } from "../../state/context/UserDetailsProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { user, setUser } = useContext(UserDetailsContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("User, redirecting");
      setUser(undefined);
      navigate('/')
    }
  }, [])

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    performLogin()
  };

  const performLogin = async () => {
    // const response = await axios.post(authUrl, {
    //   email,
    //   password
    // })

    setUser({
      email: "kake@kake.com",
      token: "kake"
    })
    navigate('/')
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