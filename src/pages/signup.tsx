import { FC, useState } from 'react';
import axios from 'axios';
import { CreateUserDto } from 'src/shared/dto/create-user.dto';
import { useRouter } from 'next/router';
import { Typography, Box, TextField, Button } from '@mui/material';

const Signup: FC = () => {
  const router = useRouter();
  const [signUpData, setSignUpData] = useState<CreateUserDto>({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/user/signup', signUpData)
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
          Sign Up
        </Typography>
        <Box style={{ margin: 10, padding: 5 }}>
          <TextField
            id="signup-name"
            label="Name"
            value={signUpData.name}
            onChange={(e) =>
              setSignUpData({ ...signUpData, name: e.target.value })
            }
          />
          <TextField
            required
            id="signup-email"
            label="Email"
            value={signUpData.email}
            onChange={(e) =>
              setSignUpData({ ...signUpData, email: e.target.value })
            }
          />
          <TextField
            id="signup-password"
            label="Password"
            type="password"
            value={signUpData.password}
            onChange={(e) =>
              setSignUpData({ ...signUpData, password: e.target.value })
            }
          />
          <TextField
            id="signup-phone"
            label="Phone"
            value={signUpData.phone}
            onChange={(e) =>
              setSignUpData({ ...signUpData, phone: e.target.value })
            }
          />
        </Box>
        <Button variant="outlined" type="submit">
          Signup
        </Button>
      </form>
    </div>
  );
};

export default Signup;
