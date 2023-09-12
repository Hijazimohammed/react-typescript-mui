import { Box, Typography } from '@mui/material';
import { Input, Button } from '@mui/joy';
import { FcGoogle } from 'react-icons/fc';
import AppleIcon from '@mui/icons-material/Apple';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PATHS } from '../../../constants/Paths';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignupSchema } from '../../../validation';
import useGetCountries from '../../../hooks/useGetCountries';
import { ICountry } from '../../../@types/country';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { IUser } from '../../../@types/auth';
import { useAppDispatch } from '../../../redux/store';
import { signUp } from '../../../redux/slices/AuthSlice';
import bcrypt from 'bcryptjs-react';

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { countries } = useGetCountries();

  const handleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = (body: IUser) => {
    const salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(body.password, salt);
    const { agree, ...rest } = body;
    rest.password = hash;
    dispatch(signUp(rest));
    navigate('/', { replace: true });
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px ',
        marginBottom: '2rem',
        marginTop: '70px',
      }}>
      <Box
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          minWidth: '40%',
          width: '50%',
          backgroundColor: '#fff',
          border: '1px solid #dfe0d5',
          borderRadius: '1rem',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}>
        <Typography
          variant='h3'
          sx={{
            fontSize: '30px',
            lineHeight: '37px',
            letterSpacing: '-1.125px',
            textAlign: 'center',
            color: '#001e00',
            fontWeight: 500,
            fontFamily: 'Trebuchet MS',
          }}>
          Sign up to hire talent
        </Typography>
        <Button
          className='login_button'
          startDecorator={<AppleIcon />}
          sx={{
            backgroundColor: '#fff',
            color: '#222',
            borderRadius: '2rem',
            border: '1px solid #222',
            padding: '0',
            width: '100%',
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
        <Button
          className='login_button'
          startDecorator={<FcGoogle className='google' />}
          sx={{
            justifyContent: 'flex-start',
            width: '100%',
            gap: '12rem',
            backgroundColor: '#4285F4',
            color: '#fff',
            borderRadius: '2rem',
            padding: 0,
            display: 'flex',

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
        <Typography
          sx={{ width: '100%', paddingBottom: '0' }}
          className='line'
          variant='body2'
          component={'div'}>
          or
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Box
            sx={{
              width: '47%',
            }}>
            <Input
              {...register('firstName')}
              placeholder='First name'
              sx={{
                border: '1px solid #e4ebe4',
                color: '#001E00',
                '&:hover': {
                  borderColor: '#cbcecb',
                },
              }}
            />
            {errors.firstName?.message && (
              <p className='error'>{errors.firstName?.message}</p>
            )}
          </Box>
          <Box
            sx={{
              width: '47%',
            }}>
            <Input
              placeholder='Last name'
              {...register('lastName')}
              sx={{
                border: '1px solid #e4ebe4',
                color: '#001E00',
                '&:hover': {
                  borderColor: '#cbcecb',
                },
              }}
            />
            {errors.lastName?.message && (
              <p className='error'>{errors.lastName?.message}</p>
            )}
          </Box>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Input
            {...register('email')}
            placeholder='Work email address'
            sx={{
              width: '100%',
              border: '1px solid #e4ebe4',
              color: '#001E00',
              '&:hover': {
                borderColor: '#cbcecb',
              },
            }}
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
            endDecorator={
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
        <Box sx={{ width: '100%' }}>
          <Autocomplete
            id='country-select-demo'
            options={countries}
            sx={{ width: '100%' }}
            autoHighlight
            getOptionLabel={(option: ICountry) => option?.name}
            renderInput={(params) => (
              <TextField
                {...register('country')}
                {...params}
                label='Select a country'
              />
            )}
          />
          {errors.country?.message && (
            <p className='error'>{errors.country?.message}</p>
          )}
        </Box>
        <FormGroup
          sx={{
            width: '100%',
            '& label span': {
              fontSize: '12px',
              lineHeight: '18px',
              letterSpacing: '0.6px',
              color: '#001e00',
            },
            '& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked, .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate':
              {
                color: '#13a000',
              },
          }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Send me emails with tips on how to find talent that fits my needs.'
          />
        </FormGroup>
        <FormGroup
          sx={{
            width: '100%',
            '& label span': {
              fontSize: '12px',
              lineHeight: '18px',
              letterSpacing: '0.6px',
              color: '#001e00',
            },
            '& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked, .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate':
              {
                color: '#13a000',
              },
          }}>
          <Box sx={{ width: '100%' }}>
            <FormControlLabel
              control={<Checkbox {...register('agree')} />}
              label='
            Yes, I understand and agree to the Upwork Terms of Service , including the User Agreement and Privacy Policy .'
            />
            {errors.agree?.message && (
              <p className='error'>{errors.agree?.message}</p>
            )}
          </Box>
        </FormGroup>
        <Button
          type='submit'
          sx={{
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0.6px',
            fontWeight: '500',
            width: '100%',
            backgroundColor: '#108a00',
            color: '#fff',
            borderRadius: '2rem',
            '&:hover': {
              backgroundColor: '#14a800',
            },
          }}>
          Create my account
        </Button>
        <Typography
          sx={{ fontSize: '14px', lineHeight: '20px', letterSpacing: '0.6px' }}
          variant='body2'
          component={'p'}>
          Already have an account?{' '}
          <Link to={PATHS.AUTH.LOGIN} className='link_redirect'>
            {' '}
            Log In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpForm;
