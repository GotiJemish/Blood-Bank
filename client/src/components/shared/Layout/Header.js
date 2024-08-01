
import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileInformation from './Mobile-Information';
const Header = () => {

  const logoStyle = {
    width: '140px',
    height: '56px',
    marginLeft: '-4px',
    marginRight: '-8px',
  };


  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'space-between', sm: 'flex-end', md: 'flex-end' },
          alignItems: 'center',
          width: '100%',
          maxWidth: { xs: '100%', md: "100%" },
        }}
      >
        <Box
          sx={{
            display: { xs: 'flex', sm: "none", md: 'none' },
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Button
            component="a"
            href="/"
            sx={{ alignSelf: 'start' }}
          >
            <img
              src={
                '/assets/images/logo.png'}
              style={logoStyle}
              alt="website's logo"
            />
          </Button>
          <MobileInformation />
        </Box>

      </Box>




    </>
  )
}

export default Header
