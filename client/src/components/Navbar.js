// import * as React from 'react';
import React, {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../images/fdf_logo.png'
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  logo: {
    width: 85,
    height: 50
  }
});

function Navbar() {
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
            <img className={classes.logo} src={logo} alt="Flight_delay_forecast" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Flights Delay Forecast
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar
