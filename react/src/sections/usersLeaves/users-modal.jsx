import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import { Box, Modal, Button, Typography } from '@mui/material';

import AuthContext from 'src/Context/authContext';

export default function UsersModal({ info, open, handleClose }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const authContext = useContext(AuthContext)
  const handleConfirm = () =>{
    fetch(`http://localhost:3000/leaves/update-leave/${info._id}/confirmed`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authContext.token}`,
        },
      })
        // eslint-disable-next-line consistent-return
        .then((res) => {
          if (!res.ok) {
            console.log(res);
            res.json();
          } else {
            return res.json();
          }
        })
        .then((res) => {
          console.log(res);
          handleClose('confirmed')
        });
  }
  const handleReject = () =>{
    fetch(`http://localhost:3000/leaves/update-leave/${info._id}/rejected`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authContext.token}`,
        },
      })
        // eslint-disable-next-line consistent-return
        .then((res) => {
          if (!res.ok) {
            console.log(res);
            res.json();
          } else {
            return res.json();
          }
        })
        .then((res) => {
          console.log(res);
          handleClose('rejected')
        });
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [open, setOpen] = useState(false);

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            عنوان مدال
          </Typography>
          <p>نام : {info.name}</p>
          <p>موقعیت : {info.position}</p>
          <p>
            نوع مرخصی :{' '}
            {(info.typeLeave === 'paid' && 'استحقاقی') ||
              (info.typeLeave === 'sick' && 'استعلاجی') ||
              (info.typeLeave === 'free' && 'بدون حقوق')}
          </p>
          <p>
            نوع درخواست :{' '}
            {(info.typeRequest === 'hourly' && 'ساعتی') ||
              (info.typeRequest === 'daily' && 'روزانه')}
          </p>
          <p>تاریخ شروع : {info.startedAt}</p>
          <p>تاریخ اتمام : {info.expiredAt}</p>
          <p>توضیحات : {info.description}</p>
          <p>
            {' '}
            وضعیت :{' '}
            <span
            //   color={
            //     (info.status === 'rejected' && 'error') ||
            //     (info.status === 'pending' && 'secondary') ||
            //     'success'
            //   }
            >
              {(info.status === 'rejected' && 'رد شد') ||
                (info.status === 'pending' && 'درحال بررسی') ||
                (info.status === 'confirmed' && 'تایید شد')}
            </span>
          </p>
          <div style={{ marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleConfirm}>
              تایید
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleReject}
              style={{ marginLeft: '10px' }}
            >
              رد
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

UsersModal.propTypes = {
  info: PropTypes.any,
  open: PropTypes.any,
  handleClose: PropTypes.func,
};
