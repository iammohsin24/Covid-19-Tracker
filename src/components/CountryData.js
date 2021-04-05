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
    const options = [];
    const [countryData,setCountryData] = useState([]);
    const [isLoading,setLoading] = useState(false);
    const [country,setCountry] = useState('Pakistan');

    useEffect( () => {
        async function fetchCountryData() {
            setLoading(true);
            const apiResponse = await fetch('https://api.covid19api.com/summary');
            if (!apiResponse.ok) {
                const message = `An error has occured: ${apiResponse.status}`;    
                console.log(message);
            } else {
                const apiData = await apiResponse.json();
                console.log(apiData);
                const countryDataFromAPI = apiData.Countries;
                setCountryData(countryDataFromAPI);
                console.log(countryData);
            }
            setLoading(false);
        }
        fetchCountryData();
    },[countryData]);
    for (let i=0; i<190; i+=1) {
        options.push(countryData[i].Country);
    }
    console.log(options);
    const countryInput = () => {
    if(isLoading) {
        return <Skeleton></Skeleton>;
    } else {
        return (
            <select value={country} onChange={({target}) => {
                setCountry(target.value);
                outputResults();
            }
            }>
                    {options.map((country, index) => (
                        <option key={index} value={country}>
                    {country}
                    </option>
                ))}
                </select>
            )
        }
    }
    const outputResults = () => {
        for (let j=0; j<190; j+=1) {
            if(countryData[j].Country === country){
                if(!isLoading){
                return (
                    <div className={classes.root}>
                        <Paper elevation={3}>
                            <Typography variant="h4" gutterBottom>
                                {countryData[j].TotalConfirmed.toLocaleString()}
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                Global Data
                            </Typography>
                        </Paper>
                        <Paper elevation={3} style={{color:'red'}}>
                            <Typography variant="h4" gutterBottom>
                                {(countryData[j].TotalConfirmed-countryData[j].TotalDeaths-countryData[j].TotalRecovered).toLocaleString()}
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                Active Cases
                            </Typography>
                        </Paper>
                        <Paper elevation={3} style={{color:'green'}}>
                            <Typography variant="h4" gutterBottom>
                                {countryData[j].TotalRecovered.toLocaleString()}
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                Recovered
                            </Typography>
                        </Paper>
                        <Paper elevation={3} style={{color:'grey'}}>
                            <Typography variant="h4" gutterBottom>
                                {countryData[j].TotalDeaths.toLocaleString()}
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                Fatalities
                            </Typography>
                        </Paper>
                    </div>
                )} else {
                    return (
                        5
                    )
            }
        }
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
