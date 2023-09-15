import React from 'react';
import { Stack, Divider } from '@mui/material';
import LeftSection from '../../components/User/HomeLayout/MainContainer/TapsSection/DrawerContent/LeftSection';
import RightSection from '../../components/User/HomeLayout/MainContainer/TapsSection/DrawerContent/RightSection';
import Navbar from '../../components/User/Navabr';
import Footer from '../../components/User/Footer';

const SingleJop = () => {
  return (
    <>
      <Navbar />
      <Stack
        direction='row'
        sx={{
          width: '80%',
          margin: '0 auto',
          border: '1px solid #ddd',
          borderRadius: '1rem',
        }}>
        <LeftSection />
        <Divider
          orientation='vertical'
          variant='middle'
          sx={{ height: 'auto' }}
        />
        <RightSection />
      </Stack>
      <Footer />
    </>
  );
};

export default SingleJop;
