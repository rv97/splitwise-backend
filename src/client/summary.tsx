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
      .get<IStatsResult>('/expense/stats', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStats(res.data);
      });
  }, []);
  return (
    <div>
      <label>Owed By Me</label>
      <h2>{stats.owedByMe}</h2>
      <label>Owed To Me</label>
      <h2>{stats.owedToMe}</h2>
    </div>
  );
};

export default Summary;
