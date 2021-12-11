import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { Rating } from '@material-ui/lab';
import useStyles from './style'

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked}) => {

    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width: 600px)');
    
    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key: 'AIzaSyBxZpSfetp6822qDxbbNtgX0tx2028mvH0'}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng});
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw});
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.map((place, i) => (
                    <div className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}>
                        
                        {!isDesktop ?(
                            <LocationOnOutlinedIcon color="red" fontSize="large" />
                        ): (
                            <Paper elevation={3} className={classes.paper}>
                                <Typography className={classes.Typography} variant="subtitle2" gutterBottom>
                                    {place.name}
                                </Typography>
                                <img className={classes.pointer} 
                                src={place.image ? place.photo.image.large.url : 'https://www.sundayguardianlive.com/wp-content/uploads/2020/07/3-Dib-restaurant-losses-edited.jpg'}
                                 alt={place.name} />

                            </Paper>
                        )}
                    </div>
                ))}
            </GoogleMapReact>
           
        </div>
    )
}

export default Map
