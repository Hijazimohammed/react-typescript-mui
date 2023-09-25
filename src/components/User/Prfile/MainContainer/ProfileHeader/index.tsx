import React from 'react';
import { Box, Stack, Typography, Avatar } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button } from '@mui/joy';

const ProfileHeader = () => {
  return (
    <Stack
      direction='row'
      spacing={2}
      sx={{
        width: '100%',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Stack direction='row' alignItems='center' spacing={2}>
        <Avatar
          alt='Remy Sharp'
          src='assets/images/global/alaa.jpg'
          sx={{
            width: '60px',
            height: '60px',
          }}
        />
        <Box alignItems='center'>
          <Typography
            variant='body1'
            sx={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#001e00',
            }}>
            Mohammed Hijazi
          </Typography>
          <Typography
            sx={{ fontSize: '12px', color: '#001e00' }}
            variant='body2'>
            <LocationOnIcon sx={{ fontSize: 15, color: '#5E6D55' }} />
            Gaza, Palestine - ... Local time
          </Typography>
        </Box>
      </Stack>
      <Stack direction='row' alignItems='center' spacing={2}>
        <Button
          sx={{
            backgroundColor: '#fff',
            color: '#14a800',
            borderRadius: '2rem',
            border: '1px solid #14a800',
            paddingX: '1rem',
            width: '100%',
            minWidth: 'fit-content',
            '&:hover': {
              backgroundColor: '#fff',
            },

            '& .MuiButton-startDecorator svg': {
              width: '1rem',
              height: '1rem',
            },
          }}>
          See Public View
        </Button>
        <Button
          sx={{
            backgroundColor: '#108a00',
            color: '#fff',
            borderRadius: '2rem',
            paddingX: '1rem',
            width: '100%',
            minWidth: 'fit-content',
            '&:hover': {
              backgroundColor: '#14a800',
            },
          }}>
          Profile Settings
        </Button>
      </Stack>
    </Stack>
  );
};

export default ProfileHeader;
