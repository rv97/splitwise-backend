import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import { FC, Fragment, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { CreateExpenseDto } from 'src/server/expense/dto/create-expense.dto';
import { useRouter } from 'next/router';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CreateExpense: FC = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [userEmails, setUserEmails] = useState([]);
  const [oExpense, setOExpense] = useState<CreateExpenseDto>({
    name: '',
    desc: '',
    amount: 0.0,
    connectedUsers: [],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateExpense = () => {
    const token = localStorage.getItem('token');
    axios
      .post('/api/expense', oExpense, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e))
      .finally(() => {
        setOpen(false);
        router.reload();
      });
  };

  const handleEmailsChange = (
    event: SelectChangeEvent<typeof oExpense.connectedUsers>,
  ) => {
    const {
      target: { value },
    } = event;
    const selectedUsers = typeof value === 'string' ? value.split(',') : value;
    setOExpense({ ...oExpense, connectedUsers: selectedUsers });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('/api/user/all', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUserEmails(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <Fragment>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Expense</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Expense Name"
                  id="expense-name"
                  variant="outlined"
                  value={oExpense.name}
                  onChange={(e) =>
                    setOExpense({ ...oExpense, name: e.target.value })
                  }
                />
                <TextField
                  label="Expense Description"
                  id="expense-desc"
                  variant="outlined"
                  value={oExpense.desc}
                  onChange={(e) =>
                    setOExpense({ ...oExpense, desc: e.target.value })
                  }
                />
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-amount">
                    Amount
                  </InputLabel>
                  <Input
                    id="expense-amount"
                    type="number"
                    startAdornment={
                      <InputAdornment position="start">Rs</InputAdornment>
                    }
                    value={oExpense.amount}
                    onChange={(e) =>
                      setOExpense({
                        ...oExpense,
                        amount: parseFloat(e.target.value),
                      })
                    }
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="userEmails">Members</InputLabel>
                  <Select
                    id="userEmails-select"
                    multiple
                    value={oExpense.connectedUsers}
                    onChange={handleEmailsChange}
                    input={<OutlinedInput label="Members" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {userEmails.map(({ email }) => (
                      <MenuItem key={email} value={email}>
                        <Checkbox
                          checked={oExpense.connectedUsers.indexOf(email) > -1}
                        />
                        <ListItemText primary={email} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateExpense}>Create</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default CreateExpense;
