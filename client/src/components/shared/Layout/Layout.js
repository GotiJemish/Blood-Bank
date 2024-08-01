
import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Header from './Header';
import Sidebar from './Sidebar';
// import HomePage from './HomePage';
import { ThemeProvider } from '@mui/material';
import { defaultTheme } from './Default';




const Layout = ({ children }) => {


  return (<>
<ThemeProvider theme={defaultTheme}>
    <Grid container sx={{ height: { xs: '100%', sm: '100dvh' } }}>
      <Grid
        item
        
        sm={3}
        md={4}
        lg={3}
        sx={{
          display: { xs: 'none', sm: 'flex', md: 'flex' },
          flexDirection: 'column',
          // backgroundColor: { xs: 'secondary.main', sm: 'primary.main' },
          backgroundColor: 'background.paper',
          borderRight: { xs: 'none', sm: 'none', md: '1px solid' },
          borderColor: { xs: 'none', sm: 'none', md: 'divider' },
          alignItems: 'center',
          pt: 4,
          pl: 5,
          pr:5,
          // gap: 4,
        }}
      >
        <Sidebar />
      </Grid>
      <Grid
        item
        sm={9}
        md={8}
        lg={9}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
          minWidth:{sm:400},
          width: '100%',
          backgroundColor: { xs: 'transparent', sm: 'background.default' },
          alignItems: 'center',
          pt: { xs: 2 },
          px: { xs: 2, sm: 5 },
          gap: { xs: 4, md: 8 },
        }}
      >
        {/* header */}
        <Header />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            width: '100%',
            maxWidth: { sm: '100%', md: '100%' },
            maxHeight: '720px',
            gap: { xs: 5, sm: 'none', md: 'none' },
          }}
        >
{/* Pages */}
{children}
        </Box>
      </Grid>
    </Grid>
    </ThemeProvider>
  </>
  );
}

export default Layout;
