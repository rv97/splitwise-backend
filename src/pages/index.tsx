import { FC } from 'react';
import ExpenseList from 'src/client/expenseList';
import Summary from 'src/client/summary';

import React from 'react';
import CreateExpense from 'src/client/createExpense';
import { Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import OwedByMeList from 'src/client/owedByMeList';

const Home: FC = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.replace('/login');
  };
  return (
    <div>
      <Grid>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
        <Summary />
      </Grid>
      <ExpenseList />
      <CreateExpense />
      <OwedByMeList />
    </div>
  );
};

export default Home;
