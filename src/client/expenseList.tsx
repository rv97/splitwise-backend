import { Expense } from '@prisma/client';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useRouter } from 'next/router';

const ExpenseList: FC = () => {
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get<Expense[]>('/api/expense/all', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log('Res', res.data);
        setExpenseList(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <Box>
      <Typography variant="h4" component="div" gutterBottom>
        Expenses Created By You
      </Typography>
      <List>
        {expenseList.map((expense) => {
          return (
            <ListItem disablePadding key={expense.id}>
              <ListItemButton
                onClick={() => {
                  router.push(`/expense/${expense.id}`);
                }}
              >
                <ListItemText primary={expense.name} secondary={expense.desc} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default ExpenseList;
