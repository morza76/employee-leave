import { useState, useContext } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Button, Snackbar } from '@mui/material';
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
// import IconButton from '@mui/material/IconButton';
import Input from 'src/components/Form/Input';
// ----------------------------------------------------------------------

export default function RegisterView() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formState, onInputHanlder] = useForm(
    {
      name: {
        value: '',
        isValid: false,
      },
      phone: {
        value: '',
        isValid: false,
      },
      personnelID: {
        value: '',
        isValid: false,
      },
      username: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
      confirmPassword: {
        value: '',
        isValid: false,
      },
      position: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  console.log(formState);


  const authContext = useContext(AuthContext)

  const theme = useTheme();

  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);

    const requestBody = {
      username: formState.inputs.username.value,
      name: formState.inputs.name.value,
      password: formState.inputs.password.value,
      phone: formState.inputs.phone.value,
      position: formState.inputs.position.value,
      personnelId: formState.inputs.personnelID.value,
    };

    fetch(`http://localhost:3000/users/register`, {
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

    // router.push('/dashboard');
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
          
          labelPlacement="start"
          element="input"
          value=""
          label="نام"
          validations={[requiredValidator(), minValidator(6), maxValidator(25)]}
          isFinalValid={formState.inputs.name.isValid}
          id="name"
          onInputHanlder={onInputHanlder}
        />
        <Input
          element="input"
          value=""
          label="تلفن همراه"
          validations={[requiredValidator(), minValidator(10), maxValidator(11)]}
          isFinalValid={formState.inputs.phone.isValid}
          id="phone"
          onInputHanlder={onInputHanlder}
        />
        <Input
          element="input"
          value=""
          label="شماره پرسنلی"
          validations={[requiredValidator()]}
          isFinalValid={formState.inputs.personnelID.isValid}
          id="personnelID"
          onInputHanlder={onInputHanlder}
        />
        <Input
          element="input"
          value=""
          label="سمت شغلی"
          validations={[requiredValidator()]}
          isFinalValid={formState.inputs.position.isValid}
          id="position"
          onInputHanlder={onInputHanlder}
        />
        <Input
          element="input"
          value=""
          label="نام کاربری"
          validations={[requiredValidator(), minValidator(6), maxValidator(25)]}
          isFinalValid={formState.inputs.username.isValid}
          id="username"
          onInputHanlder={onInputHanlder}
        />
        <Input
          name="password"
          element="input"
          label="گذرواژه"
          value=""
          validations={[requiredValidator(), minValidator(8), maxValidator(20)]}
          id="password"
          onInputHanlder={onInputHanlder}
          isFinalValid={formState.inputs.password.isValid}
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
        {/* <Input
          name="confirmPassword"
          element="input"
          label="تکرار گذرواژه"
          value=""
          validations={[requiredValidator()]}
          id="confirmPassword"
          onInputHanlder={onInputHanlder}
          type={confirmPassword ? 'text' : 'password'}
          isFinalValid={formState.inputs.confirmPassword.isValid}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setConfirmPassword(!confirmPassword)} edge="end">
                  <Iconify icon={confirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}
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
        ثبت نام
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
        message="این حساب قبلا ایجاد شده است."
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
          <Typography variant="h4">ثبت نام</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            تا حالا ثبت نام کرده اید؟
            <Link to="/login" component={RouterLink} variant="subtitle2" sx={{ ml: 0.5 }}>
              ورود
            </Link>
          </Typography>
          
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
