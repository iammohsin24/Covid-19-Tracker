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
    const [isLoading,setLoading] = useState(false);
    const [country,setCountry] = useState('Pakistan');

    useEffect(() => {
        const fetchCountryData = async () => {
            setLoading(true);
            fetch('https://api.covid19api.com/summary')
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                const { Countries } = data;
                console.log(Countries);
                setCountryData(Countries);
                console.log(countryData);
                setCountries(
                    Countries.map(item=> {
                        return item.Country;
                    })
                );
                console.log(countries);
                setLoading(false);

            })
            .catch((e)=> {
                console.log(e)
            });
        }
        fetchCountryData();
        // eslint-disable-next-line
    },[]);

    const countryInput = () => {
    if(isLoading) {
        return <Skeleton></Skeleton>;
    } else {
        return (
            <select value={country} onChange={({target}) => {
                setCountry(target.value);
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
        if (isLoading) {
            return (
                <Skeleton></Skeleton>
            )} else {
        const i = countries.findIndex(item=> item === country);
        console.log(i);
        return (
            <div className={classes.root}>
                <Paper elevation={3}>
                    <Typography variant="h4" gutterBottom>
                        {countryData && countryData[i].TotalConfirmed.toLocaleString()}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        Total Cases
                        </Typography>
                </Paper>
                <Paper elevation={3} style={{ color: 'red' }}>
                    <Typography variant="h4" gutterBottom>
                        {countryData && (countryData[i].TotalConfirmed - countryData[i].TotalDeaths - countryData[i].TotalRecovered).toLocaleString()}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        Active Cases
                        </Typography>
                </Paper>
                <Paper elevation={3} style={{ color: 'green' }}>
                    <Typography variant="h4" gutterBottom>
                        {countryData && countryData[i].TotalRecovered.toLocaleString()}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        Recovered
                        </Typography>
                </Paper>
                <Paper elevation={3} style={{ color: 'grey' }}>
                    <Typography variant="h4" gutterBottom>
                        {countryData && countryData[i].TotalDeaths.toLocaleString()}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        Fatalities
                        </Typography>
                </Paper>
            </div>
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