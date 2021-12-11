import React from 'react'
import { CssBaseline, Grid } from '@material-ui/core'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import { getPlacesData } from './api/index';
import { useEffect } from 'react'
import { useState } from 'react'



const App = () => {
    const [places, setPlaces] = useState([])
    const [childClicked, setChildClicked] = useState(null);
    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})
    const [isloading, setIsloading] = useState(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: { latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude});
        })
    }, []);

    useEffect(() => {   
        console.log(coordinates, bounds)

        setIsloading(true)
        getPlacesData(bounds.sw, bounds.ne)
        .then((data) => {
            console.log(data);
            setIsloading(false)
            setPlaces(data);
        })
    }, [coordinates, bounds])


    return (
        <div>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List places={places}
                        childClicked={childClicked}
                        isloading={isloading}
                        />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map setCoordinates={setCoordinates}
                      setBounds={setBounds} 
                      coordinates={coordinates}
                      places={places}
                      setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default App
