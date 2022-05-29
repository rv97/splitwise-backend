import { FC, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LoginUserDto } from 'src/shared/dto/login-user.dto';
import { Box, Button, TextField, Typography } from '@mui/material';

const Signup: FC = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginUserDto>({
    email: '',
    password: '',
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/user/login', loginData)
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
        <Typography variant="h4" component="div" gutterBottom>
          Sign In
        </Typography>
        <Box style={{ margin: 10, padding: 5 }}>
          <TextField
            required
            id="login-email"
            label="Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
          <TextField
            id="login-password"
            label="Password"
            type="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </Box>
        <Button variant="outlined" type="submit">
          Login
        </Button>
      </form>
      <Typography variant="body1" component="div" gutterBottom>
        Don't have an account ? <Link href="/signup"> Signup </Link>
      </Typography>
    </div>
  );
};

export default Signup;
