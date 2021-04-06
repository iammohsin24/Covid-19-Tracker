import { InputLabel, makeStyles, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'

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

  export const CountryData = () => {
    const classes = useStyles();
    const [countryData,setCountryData] = useState([]);
    const [countries,setCountries] = useState([]);
    const [isLoading,setLoading] = useState(true);
    const [country,setCountry] = useState('Pakistan');

    useEffect( () => {
        async function fetchCountryData() {
            try {
                const apiResponse = await fetch('https://api.covid19api.com/summary');
                const apiData = await apiResponse.json();
                console.log(apiData);
                const countryDataFromAPI = apiData.Countries;
                setCountryData(countryDataFromAPI);
                console.log(countryData);
                setCountries(
                    countryDataFromAPI.map(item=> {
                        return item.Country;
                    })
                );
                console.log(countries);
            }
            catch(error) {
                console.log(error);
            }
            setLoading(false);
        }
        fetchCountryData();
    },[]);

    const countryInput = () => {
    if(isLoading) {
        return <Skeleton></Skeleton>;
    } else {
        return (
            <select value={country} onChange={({target}) => {
                setCountry(target.value);
                // outputResults();
            }
            }>
                    {countries.map((country, index) => (
                        <option key={index} value={country}>
                    {country}
                    </option>
                ))}
                </select>
            )
        }
    }

    const outputResults = () => {
        const i = countries.findIndex(item=> item === country);
        console.log(i);
        if(!isLoading){
            return (
                <div className={classes.root}>
                    <Paper elevation={3}>
                        <Typography variant="h4" gutterBottom>
                            {countryData[i].TotalConfirmed.toLocaleString()}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Global Data
                        </Typography>
                    </Paper>
                    <Paper elevation={3} style={{color:'red'}}>
                        <Typography variant="h4" gutterBottom>
                            {(countryData[i].TotalConfirmed-countryData[i].TotalDeaths-countryData[i].TotalRecovered).toLocaleString()}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Active Cases
                        </Typography>
                    </Paper>
                    <Paper elevation={3} style={{color:'green'}}>
                        <Typography variant="h4" gutterBottom>
                            {countryData[i].TotalRecovered.toLocaleString()}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Recovered
                        </Typography>
                    </Paper>
                    <Paper elevation={3} style={{color:'grey'}}>
                        <Typography variant="h4" gutterBottom>
                            {countryData[i].TotalDeaths.toLocaleString()}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Fatalities
                        </Typography>
                    </Paper>
                </div>
            )} else {
                    return (
                        <Skeleton></Skeleton>
                    )
        }
}

return (
            <>
                <form>
                    <InputLabel>Select Country:</InputLabel>
                    {countryInput()}
                </form>
                {outputResults()}
            </>
        )
}  