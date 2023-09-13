/* eslint-disable eqeqeq */
import { Input, Button } from '@mui/joy';
import { Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import './style.css';
import { FcGoogle } from 'react-icons/fc';
import AppleIcon from '@mui/icons-material/Apple';
import { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../../../validation';
import useGetAllUsers from '../../../hooks/useGetAllUsers';
import {
  fetchFoundEmail,
  fetchFoundPassword,
  showDialog,
} from '../../../utils';
import { ILogin, IUser } from '../../../@types/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/store';
import { login } from '../../../redux/slices/AuthSlice';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { users } = useGetAllUsers();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const handleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };
  let comparePassword: boolean;
  const onSubmit = (body: ILogin) => {
    const found: IUser | null = fetchFoundEmail(body, users);
    if (found)
      comparePassword = fetchFoundPassword(body.password, found.password);
    if (comparePassword == true) {
      showDialog('success', 'Login successfully', 'success');
      dispatch(login(found));
      navigate('/', { replace: true });
    } else {
      showDialog('error', 'Login failed', 'error');
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 30px',
        marginBottom: '2rem',
        marginTop: '70px',
      }}>
      <Box
        sx={{
          minWidth: '40%',
          width: 'auto',
          backgroundColor: '#fff',
          border: '1px solid #dfe0d5',
          borderRadius: '1rem',
        }}>
        <Box
          sx={{
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Box
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              width: 370,
              padding: '0 15px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              paddingBottom: '131px',
            }}>
            <Typography
              variant='h3'
              sx={{
                fontSize: '26px',
                lineHeight: '32px',
                letterSpacing: '0.6px',
                textAlign: 'center',
                color: '#001e00',
              }}>
              Login in to Upwork
            </Typography>
            <Box sx={{ width: '100%' }}>
              <Input
                {...register('email')}
                autoFocus={false}
                className='input-group'
                sx={{
                  border: '2px solid #e4ebe4',
                  color: '#001E00',
                  '&:hover': {
                    borderColor: '#cbcecb',
                  },
                }}
                placeholder='Username or Email'
                startDecorator={
                  <PersonIcon sx={{ color: '#001E00', width: '1.2rem' }} />
                }
              />
              {errors.email?.message && (
                <p className='error'>{errors.email?.message}</p>
              )}
            </Box>
            <Box sx={{ width: '100%' }}>
              <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                sx={{
                  width: '100%',
                  border: '1px solid #e4ebe4',
                  color: '#001E00',
                  '&:hover': {
                    borderColor: '#cbcecb',
                  },
                }}
                placeholder='Password (8 or more characters)'
                startDecorator={
                  showPassword ? (
                    <VisibilityIcon
                      onClick={handleShowPassword}
                      sx={{ color: '#001E00', width: '1.2rem' }}
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={handleShowPassword}
                      sx={{ color: '#001E00', width: '1.2rem' }}
                    />
                  )
                }
              />
              {errors.password?.message && (
                <p className='error'>{errors.password?.message}</p>
              )}
            </Box>
            <Button
              type='submit'
              className='login_button'
              sx={{
                backgroundColor: '#108a00',
                color: '#fff',
                borderRadius: '2rem',
                '&:hover': {
                  backgroundColor: '#14a800',
                },
              }}>
              Continue with Email
            </Button>

            <Typography
              variant='body1'
              sx={{
                width: '100%',
                textAlign: 'center',
                fontWeight: '300',
                lineHeight: '.1em',
                color: '#606060',
                background: '#fff',
                borderBottom: '1px solid #e0e0e0',
                '& span': {
                  background: '#fff',
                  padding: '0 10px',
                },
              }}>
              <span>or</span>
            </Typography>

            <Button
              className='login_button'
              startDecorator={<FcGoogle className='google' />}
              sx={{
                justifyContent: 'flex-start',
                gap: '3.8rem',
                backgroundColor: '#4285F4',
                color: '#fff',
                borderRadius: '2rem',
                padding: 0,
                '&:hover': {
                  backgroundColor: '#4285F4',
                },
                '& .MuiButton-startDecorator': {
                  background: '#fff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              }}>
              Continue with Google
            </Button>

            <Button
              className='login_button'
              startDecorator={<AppleIcon />}
              sx={{
                backgroundColor: '#fff',
                color: '#222',
                borderRadius: '2rem',
                border: '1px solid #222',
                padding: '0',
                '&:hover': {
                  backgroundColor: '#fff',
                },
                '& .MuiButton-startDecorator': {
                  color: '#001E00',
                },
                '& .MuiButton-startDecorator svg': {
                  width: '1rem',
                  height: '1rem',
                },
              }}>
              Continue with Apple
            </Button>
          </Box>
          <Typography className='line' variant='body2' component={'div'}>
            Don't have an Upwork account?
          </Typography>
          <Link to='/signup'>
            <Button
              sx={{
                width: '218px',
                backgroundColor: '#fff',
                color: '#108a00',
                borderRadius: '2rem',
                border: '1px solid #108a00',
                padding: '0',
                '&:hover': {
                  backgroundColor: '#fff',
                },
              }}>
              Sign Up
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
