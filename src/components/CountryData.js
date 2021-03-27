import { InputLabel, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'

// const useStyles = makeStyles((theme) => ({
//     root: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       '& > *': {
//         margin: theme.spacing(1),
//         width: '100%',
//         height: theme.spacing(16),
//       },
//     },
//   }));

export const CountryData = () => {
    // const classes = useStyles();
    const options = [];
    const [countryData,setCountryData] = useState([]);
    const [isLoading,setLoading] = useState(false);

    useEffect( () => {
        async function fetchCountryData() {
            setLoading(true);
            const apiResponse = await fetch('https://api.covid19api.com/summary');
            const apiData = await apiResponse.json();
            console.log(apiData);
            const countryDataFromAPI = apiData.Countries;
            setCountryData(countryDataFromAPI);
            setLoading(false);
            console.log(countryData[0]);
            for (let i=0; i<190; i+=1) {
                options.push(countryData[i].Country);
            }
            console.log(options);
        }
        fetchCountryData();
    },[]);
    if(isLoading) {
        return 'Loading...';
    } else {
        return (
            <form>
                <InputLabel>Select Country:</InputLabel>
                <select>
                    {options.map(option => (
                    <option key={option} value={option}>
                    {option}
                    </option>
                ))}
                </select>
            </form>
            )
         }
}

// const loading = 'Loading...';
// if(isLoading){
//     return (
//        <div className={classes.root}>
//     <Paper elevation={3}>
//       <Typography variant="h4" gutterBottom>
//         {loading}
//       </Typography>
//       <Typography variant="subtitle2" gutterBottom>
//         Global Data
//       </Typography>
//     </Paper>
//     <Paper elevation={3} style={{color:'red'}}>
//       <Typography variant="h4" gutterBottom>
//         {loading}
//       </Typography>
//       <Typography variant="subtitle2" gutterBottom>
//         Active Cases
//       </Typography>
//     </Paper>
//     <Paper elevation={3} style={{color:'green'}}>
//       <Typography variant="h4" gutterBottom>
//         {loading}
//       </Typography>
//       <Typography variant="subtitle2" gutterBottom>
//         Recovered
//       </Typography>
//     </Paper>
//     <Paper elevation={3} style={{color:'grey'}}>
//       <Typography variant="h4" gutterBottom>
//         {loading}
//       </Typography>
//       <Typography variant="subtitle2" gutterBottom>
//         Fatalities
//       </Typography>
//     </Paper>
// </div>
// )}
// else {
//      return (
//         <div className={classes.root}>
//       <Paper elevation={3}>
//         <Typography variant="h4" gutterBottom>
//           {countryData && countryData.Global && countryData.Global.TotalConfirmed.toLocaleString()}
//         </Typography>
//         <Typography variant="subtitle2" gutterBottom>
//           Global Data
//         </Typography>
//       </Paper>
//       <Paper elevation={3} style={{color:'red'}}>
//         <Typography variant="h4" gutterBottom>
//           {countryData && countryData.Global && (countryData.Global.TotalConfirmed-countryData.Global.TotalDeaths-countryData.Global.TotalRecovered).toLocaleString()}
//         </Typography>
//         <Typography variant="subtitle2" gutterBottom>
//           Active Cases
//         </Typography>
//       </Paper>
//       <Paper elevation={3} style={{color:'green'}}>
//         <Typography variant="h4" gutterBottom>
//           {countryData && countryData.Global && countryData.Global.TotalRecovered.toLocaleString()}
//         </Typography>
//         <Typography variant="subtitle2" gutterBottom>
//           Recovered
//         </Typography>
//       </Paper>
//       <Paper elevation={3} style={{color:'grey'}}>
//         <Typography variant="h4" gutterBottom>
//           {countryData && countryData.Global &&countryData.Global.TotalDeaths.toLocaleString()}
//         </Typography>
//         <Typography variant="subtitle2" gutterBottom>
//           Fatalities
//         </Typography>
//       </Paper>
//   </div>
// )}