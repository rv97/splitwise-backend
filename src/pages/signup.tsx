import { FC, useState } from 'react';
import axios from 'axios';
import { CreateUserDto } from 'src/shared/dto/create-user.dto';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
      .post('/user/signup', signUpData)
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
        <label>Name</label>
        <input
          type="text"
          value={signUpData.name}
          onChange={(e) =>
            setSignUpData({ ...signUpData, name: e.target.value })
          }
        />
        <label>Email</label>
        <input
          type="email"
          value={signUpData.email}
          onChange={(e) =>
            setSignUpData({ ...signUpData, email: e.target.value })
          }
        />
        <label>Password</label>
        <input
          type="password"
          value={signUpData.password}
          onChange={(e) =>
            setSignUpData({ ...signUpData, password: e.target.value })
          }
        />
        <label>Phone Number</label>
        <input
          type="text"
          value={signUpData.phone}
          onChange={(e) =>
            setSignUpData({ ...signUpData, phone: e.target.value })
          }
        />
        <button type="submit"> SignUp</button>
      </form>
      <p>
        Already a user ? <Link href="/login"> Login </Link>
      </p>
    </div>
  );
};

export default Signup;
