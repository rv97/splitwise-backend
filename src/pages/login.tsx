import { FC, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LoginUserDto } from 'src/shared/dto/login-user.dto';

const Signup: FC = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginUserDto>({
    email: '',
    password: '',
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/user/login', loginData)
      .then((res) => {
        localStorage.setItem('token', res.data.accessToken);
        router.replace('/');
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />
        <label>Password</label>
        <input
          type="password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <button type="submit"> Login </button>
      </form>
      <p>
        Don't have an account ? <Link href="/signup"> Signup </Link>
      </p>
    </div>
  );
};

export default Signup;
