import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { Expense, Split, User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

const ExpenseDetail: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [expense, setExpense] = useState<
    | (Expense & {
        splits: (Split & {
          user: User;
        })[];
      })
    | null
  >(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`/api/expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setExpense(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <Box>
      <Typography variant="h2" component="div" gutterBottom>
        Expense Detail
      </Typography>
      <Typography variant="h4" component="div" gutterBottom>
        {expense?.name}
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        {expense?.amount}
      </Typography>
      <Typography variant="h3" component="div" gutterBottom>
        Splits
      </Typography>
      <List>
        {expense?.splits?.map((split) => {
          return (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={split.user.name}
                  secondary={split.shareAmount}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default ExpenseDetail;
