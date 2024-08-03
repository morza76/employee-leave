import { useState, useContext } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import { Button, Snackbar, TextField } from '@mui/material';

// import { useRouter } from 'src/routes/hooks';

// import { fa } from 'date-fns/locale';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalaliV3';

import useForm from 'src/hooks/useForm';

import { bgGradient } from 'src/theme/css';
import AuthContext from 'src/Context/authContext';
import { requiredValidator } from 'src/validators/rules';

import Logo from 'src/components/logo';
// import IconButton from '@mui/material/IconButton';
import Input from 'src/components/Form/Input';
import DynamicSelect from 'src/components/Form/Select';
import DynamicDatePicker from 'src/components/Form/DynamicDatePicker';

// ----------------------------------------------------------------------

export default function CreateLeave() {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, onInputHanlder] = useForm(
    {
      typeLeave: {
        value: '',
        isValid: false,
      },
      typeRequest: {
        value: '',
        isValid: false,
      },
      startedAt: {
        value: '',
        isValid: false,
      },
      expiredAt: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      file: {
        value: 'true',
        isValid: true,
      },
    },
    false
  );

  console.log(formState);
  console.log(formState.isFormValid);

  const authContext = useContext(AuthContext);

  const theme = useTheme();

  // const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);

    const requestBody = {
      name: authContext.userInfos.name,
      position: authContext.userInfos.position,
      userId: authContext.userInfos.username,
      typeLeave: formState.inputs.typeLeave.value,
      typeRequest: formState.inputs.typeRequest.value,
      startedAt: formState.inputs.startedAt.value,
      expiredAt: formState.inputs.expiredAt.value,
      description: formState.inputs.description.value,
      file: formState.inputs.file.value,
    };

    fetch(`http://localhost:3000/leaves/create-leave`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authContext.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          setOpen(true);
          setIsLoading(false);
          if (res.status === 401) {
            authContext.logout();
          }
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setIsLoading(false);

        // authContext.login(data.userData , data.accessToken , data.refresh , data.roles )
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
  const [selectedTime, setSelectedTime] = useState(null);
  const renderForm = (
    <>
      <Stack spacing={3} dir="rtl">
        <DynamicSelect
          element="input"
          options={[
            { value: 'hourly', lable: 'ساعتی' },
            { value: 'daily', lable: 'روزانه' },
          ]}
          value=""
          label="نوع درخواست"
          validations={[requiredValidator()]}
          isFinalValid={formState.inputs.typeRequest.isValid}
          id="typeRequest"
          onInputHanlder={onInputHanlder}
        />
        <DynamicSelect
          element="input"
          options={[
            { value: 'sick', lable: 'استعلاجی' },
            { value: 'paid', lable: 'استحقاقی' },
            { value: 'free', lable: 'بدون حقوق' },
          ]}
          value=""
          label="نوع مرخصی"
          validations={[requiredValidator()]}
          isFinalValid={formState.inputs.typeLeave.isValid}
          id="typeLeave"
          onInputHanlder={onInputHanlder}
        />
        {(formState.inputs.typeRequest.value === 'hourly' && (
          <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
            <TimePicker
              label="زمان شروع"
              value={selectedTime}
              onChange={(newValue) => {
                setSelectedTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="زمان پایان"
              value={selectedTime}
              onChange={(newValue) => {
                setSelectedTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        )) ||
          (formState.inputs.typeRequest.value === 'daily' && (
            <>
              <DynamicDatePicker
                name="date-picker"
                label="تاریخ شروع"
                value=""
                validations={[requiredValidator()]}
                id="startedAt"
                onInputHanlder={onInputHanlder}
                isFinalValid={formState.inputs.startedAt.isValid}
              />
              <DynamicDatePicker
                name="date-picker"
                value=""
                label="تاریخ اتمام"
                validations={[requiredValidator()]}
                isFinalValid={formState.inputs.expiredAt.isValid}
                id="expiredAt"
                onInputHanlder={onInputHanlder}
              />
            </>
          ))}

        <Input
          element="input"
          value=""
          label="توضیحات"
          validations={[requiredValidator()]}
          isFinalValid={formState.inputs.description.isValid}
          id="description"
          onInputHanlder={onInputHanlder}
        />
        <TextField
          type="file"
          element="input"
          value=""
          label="مستندات"
          validations={[]}
          isFinalValid={formState.inputs.file.isValid}
          id="file"
          onInputHanlder={onInputHanlder}
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
        message="متاسفانه مشکلی در سرور به وجود امده است"
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
          <Typography variant="h4" sx={{ mb: 5 }}>
            {' '}
            درخواست مرخصی
          </Typography>

          {/* <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            تا حالا ثبت نام کرده اید؟
            <Link to="/login" component={RouterLink} variant="subtitle2" sx={{ ml: 0.5 }}>
              ورود
            </Link>
          </Typography> */}

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
