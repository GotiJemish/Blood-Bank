
import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

import Sidebar from './Sidebar';

const Mobile_Information=()=> {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 'auto', px: 3, pb: 3, pt: 8 }} role="presentation">
      <IconButton
        onClick={toggleDrawer(false)}
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <Sidebar />
    </Box>
  );

  return (
    <Box>
      <Button
        variant="text"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon  fontSize='large'/>
      </Button>
      <Drawer open={open} anchor="top" onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}



export default Mobile_Information;
