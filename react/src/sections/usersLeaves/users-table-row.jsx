import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import UsersModal from './users-modal';

// ----------------------------------------------------------------------

export default function UsersTableRow({
  info,
  avatarUrl,
  name,
  position,
  typeLeave,
  typeRequest,
  startedAt,
  expiredAt,
  status,
  selected,
  handleClick,
}) {
  const [leaveInfo, setLeaveInfo] = useState(info);
  const [open, setOpen] = useState(null);

  const handleOpen = () => {
    console.log(info);
    setOpen(true);
  };
  const handleClose = (modalStatus) => {
    console.log('status ==== ', modalStatus);
    if (modalStatus === 'confirmed' || modalStatus === 'rejected') {
      setLeaveInfo((prevLeaveInfo) => ({
        ...prevLeaveInfo, // استفاده از spread operator برای حفظ سایر مقادیر
        status: modalStatus, // تغییر نام
      }));
    }
    setOpen(false);
  };

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="center">{position}</TableCell>

        <TableCell align="center">
          {(typeLeave === 'paid' && 'استحقاقی') ||
            (typeLeave === 'sick' && 'استعلاجی') ||
            (typeLeave === 'free' && 'بدون حقوق')}
        </TableCell>

        <TableCell align="center">
          {(typeRequest === 'hourly' && 'ساعتی') || (typeRequest === 'daily' && 'روزانه')}
        </TableCell>

        <TableCell align="center">{startedAt}</TableCell>

        <TableCell align="center">{expiredAt}</TableCell>

        <TableCell align="center">
          <Label
            color={
              (leaveInfo.status === 'rejected' && 'error') ||
              (leaveInfo.status === 'pending' && 'secondary') ||
              'success'
            }
          >
            {(leaveInfo.status === 'rejected' && 'رد شد') ||
              (leaveInfo.status === 'pending' && 'درحال بررسی') ||
              (leaveInfo.status === 'confirmed' && 'تایید شد')}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <UsersModal info={leaveInfo} open={open} handleClose={handleClose} />
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            عنوان مدال
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            این متن داخل مدال است. آیا درخواست را تایید می‌کنید؟
          </Typography>
          <div style={{ marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleClose}>
              تایید
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose}
              style={{ marginLeft: '10px' }}
            >
              رد
            </Button>
          </div>
        </Box>
      </Modal> */}
      {/* <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover> */}
    </>
  );
}

UsersTableRow.propTypes = {
  info: PropTypes.any,
  avatarUrl: PropTypes.any,
  position: PropTypes.any,
  handleClick: PropTypes.func,
  expiredAt: PropTypes.any,
  name: PropTypes.any,
  startedAt: PropTypes.any,
  selected: PropTypes.any,
  typeLeave: PropTypes.any,
  typeRequest: PropTypes.any,
  status: PropTypes.string,
};
