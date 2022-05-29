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
import { Split } from '@prisma/client';

type IOwedByMe = Split & {
  expense: {
    createdBy: {
      name: string;
    };
  };
};

const OwedByMeList: FC = () => {
  const [owedByMeList, setOwedByMeList] = useState<Array<IOwedByMe>>([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get<Array<IOwedByMe>>('/api/expense/mydebt', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOwedByMeList(res.data);
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
        {owedByMeList?.map((split) => {
          return (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={split.expense.createdBy.name}
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

export default OwedByMeList;
