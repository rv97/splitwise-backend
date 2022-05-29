import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { IStatsResult } from 'src/shared/types/IStatsResult';

const Summary: FC = () => {
  const [stats, setStats] = useState<IStatsResult>({
    owedByMe: 0.0,
    owedToMe: 0.0,
  });
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get<IStatsResult>('/api/expense/stats', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStats(res.data);
      });
  }, []);
  return (
    <Box>
      <Typography variant="h4" component="div" gutterBottom>
        Summary
      </Typography>
      <Grid container spacing={8} style={{ marginBottom: 10 }}>
        <Grid item md={6}>
          <Card sx={{ minWidth: 275 }} elevation={10}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Owed By Me
              </Typography>
              <Typography variant="h5" component="div">
                Rs. {stats.owedByMe}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card sx={{ minWidth: 275 }} elevation={10}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Owed To Me
              </Typography>
              <Typography variant="h5" component="div">
                Rs. {stats.owedToMe}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Summary;
