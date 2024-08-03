import { useState, useContext } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import useForm from 'src/hooks/useForm';

import { bgGradient } from 'src/theme/css';
import AuthContext from 'src/Context/authContext';
import { maxValidator, minValidator, requiredValidator } from 'src/validators/rules';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import Input from 'src/components/Form/Input';
// ----------------------------------------------------------------------

export default function LoginView() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formState, onInputHanlder] = useForm(
    {
      username: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const authContext = useContext(AuthContext)

  console.log(formState);

  const theme = useTheme();

  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);

    const requestBody = {
      username: formState.inputs.username.value,
      password: formState.inputs.password.value,
    };

    fetch(`http://localhost:3000/users/auth`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          setOpen(true);
          setIsLoading(false);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        authContext.login(data.userData , data.accessToken , data.refresh , data.roles )
        
      });
  };
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        بستن
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        {/* <CloseIcon fontSize="small" /> */}
      </IconButton>
    </>
  );

  const renderForm = (
    <>
      <Stack spacing={3} dir="rtl">
        <Input
          element="input"
          value=""
          label="نام کاربری"
          isFinalValid={formState.inputs.username.isValid}
          validations={[requiredValidator(), minValidator(6), maxValidator(25)]}
          id="username"
          onInputHanlder={onInputHanlder}
        />
        <Input
          name="password"
          element="input"
          label="گذرواژه"
          value=""
          isFinalValid={formState.inputs.password.isValid}
          validations={[requiredValidator(), minValidator(6), maxValidator(25)]}
          id="password"
          onInputHanlder={onInputHanlder}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          {/* Forgot password? */}
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        disabled={!formState.isFormValid}
        loading={isLoading}
      >
        ورود
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="نام کاربری یا پسوورد اشتباه است"
        action={action}
      />
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">ورود به داشبورد</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            تا حالا ثبت نام نکرده اید؟
            <Link to="/register" component={RouterLink} variant="subtitle2" sx={{ ml: 0.5 }}>
              ثبت نام
            </Link>
          </Typography>

          {/* <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider> */}

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
