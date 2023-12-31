import React from 'react';
import Footer from '../Footer';
import { Stack, Box } from '@mui/material';
import Sidebar from './Sidebar';
import MainContainer from './MainContainer';
import ProfileHeader from './MainContainer/ProfileHeader';

const ProfileLayout = () => {
  return (
    <Box
      mt='1rem'
      sx={{
        width: '100%',
        maxWidth: '1440px',
        margin: '0 auto',
      }}>
      <Stack
        sx={{
          margin: '0 auto',
          border: '1px solid #ddd',
          borderRadius: '1rem',
        }}
        width={'80%'}
        spacing={4}
        direction='column'>
        <Box>
          <ProfileHeader />
        </Box>

        <Stack
          sx={{ margin: '0 auto', borderTop: '1px solid #ddd' }}
          width={'100%'}
          direction='row'>
          <Box sx={{ width: '25%' }}>
            <Sidebar />
          </Box>
          <Box sx={{ width: '78%' }}>
            <MainContainer />
          </Box>
        </Stack>
      </Stack>
      <Footer />
    </Box>
  );
};

export default ProfileLayout;
