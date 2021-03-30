import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      height: theme.spacing(16),
    },
  },
}));

export default function GlobalData() {
  const classes = useStyles();

  const [globalData,setGlobalData] = useState({});
  const [isLoading,setLoading] = useState(false);
  
  useEffect(() => {
    async function fetchGlobalData() {
      setLoading(true);
      const apiResponse = await fetch('https://api.covid19api.com/summary');
      const apiData = await apiResponse.json();
      setGlobalData(apiData);
      console.log(apiData);
      setLoading(false);
    }
    fetchGlobalData();
  }, []);
  const loading = 'Loading...';
  
  if (isLoading) {
  return (
    <div className={classes.root}>
        <Paper elevation={3}>
          <Typography variant="h4" gutterBottom>
            {loading}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Global Data
          </Typography>
        </Paper>
        <Paper elevation={3} style={{color:'red'}}>
          <Typography variant="h4" gutterBottom>
            {loading}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Active Cases
          </Typography>
        </Paper>
        <Paper elevation={3} style={{color:'green'}}>
          <Typography variant="h4" gutterBottom>
            {loading}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Recovered
          </Typography>
        </Paper>
        <Paper elevation={3} style={{color:'grey'}}>
          <Typography variant="h4" gutterBottom>
            {loading}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Fatalities
          </Typography>
        </Paper>
    </div>
  );
}
  else {
    return (
      <div className={classes.root}>
          <h2>Global Stats</h2>
          <Paper elevation={3}>
            <Typography variant="h4" gutterBottom>
              {globalData && globalData.Global && globalData.Global.TotalConfirmed.toLocaleString()}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Global Data
            </Typography>
          </Paper>
          <Paper elevation={3} style={{color:'red'}}>
            <Typography variant="h4" gutterBottom>
              {globalData && globalData.Global && (globalData.Global.TotalConfirmed-globalData.Global.TotalDeaths-globalData.Global.TotalRecovered).toLocaleString()}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Active Cases
            </Typography>
          </Paper>
          <Paper elevation={3} style={{color:'green'}}>
            <Typography variant="h4" gutterBottom>
              {globalData && globalData.Global && globalData.Global.TotalRecovered.toLocaleString()}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Recovered
            </Typography>
          </Paper>
          <Paper elevation={3} style={{color:'grey'}}>
            <Typography variant="h4" gutterBottom>
              {globalData && globalData.Global && globalData.Global.TotalDeaths.toLocaleString()}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Fatalities
            </Typography>
          </Paper>
      </div>
    );
  }
}
