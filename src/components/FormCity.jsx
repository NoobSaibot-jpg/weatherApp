
import cities from './cities.json';
import { useEffect, useState, useContext } from 'react';
import * as React from 'react';
import { Button } from '@mui/material';
import { SwipeableDrawer, Autocomplete, TextField } from '@mui/material';
import { CitiesContext } from './Context';


export default function FormCity() {
  
  
  const [Cities, setCities] = useState([]);
  const [context, setContext] = useContext(CitiesContext);

  useEffect(() => {
    setCities(cities)
  }, [])
  const [state, setState] = useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Autocomplete
    disablePortal
    id="combo-box-demo"
    options={Cities.map(i=> i.name)}
    sx={{ width: 300, marginTop:5 }}
    renderInput={(params) => <TextField {...params} label="Cities" />}
    value={context}
    onChange={(event, newValue) => {
      setContext(newValue);
      localStorage.setItem('city', newValue)
    }}
  />
  );

  return (
      <div>
        {['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>
  );
}
