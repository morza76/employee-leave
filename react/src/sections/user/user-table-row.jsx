import PropTypes from 'prop-types';
import { useContext } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import AuthContext from 'src/Context/authContext';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  info,
  selected,
  typeLeave,
  avatarUrl,
  typeRequest,
  startedAt,
  expiredAt,
  status,
  handleClick,
  handleDelete
}) {
  const authContext = useContext(AuthContext)
  // const [open, setOpen] = useState(null);

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };
  const deleteLeave = () => {
    fetch(`http://localhost:3000/leaves/${info._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authContext.token}`,
        // 'Access-Control-Allow-Origin': '*'
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
        handleDelete()
      });
  };
  return (
    <>
      <TableRow hover tabIndex={-1} name="checkbox" selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

        <TableCell align="center">
          {/* <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={typeLeave} src={avatarUrl} />
            <Typography align="center"> */}
          {(typeLeave === 'paid' && 'استحقاقی') ||
            (typeLeave === 'sick' && 'استعلاجی') ||
            (typeLeave === 'free' && 'بدون حقوق')}
          {/* </Typography>
          </Stack> */}
        </TableCell>

        <TableCell align="center">
          {(typeRequest === 'hourly' && 'ساعتی') || (typeRequest === 'daily' && 'روزانه')}
        </TableCell>

        <TableCell align="center">{startedAt}</TableCell>

        <TableCell align="center">{expiredAt}</TableCell>

        <TableCell align="center">
          <Label
            color={
              (status === 'rejected' && 'error') ||
              (status === 'pending' && 'secondary') ||
              'success'
            }
          >
            {(status === 'rejected' && 'رد شد') ||
              (status === 'pending' && 'درحال بررسی') ||
              (status === 'confirmed' && 'تایید شد')}
          </Label>
        </TableCell>

        <TableCell align="right">
          {status === 'pending' && (
            <IconButton onClick={deleteLeave} sx={{ color: 'error.main' }}>
              <Iconify icon="eva:trash-2-outline"  />
              
            </IconButton>
          )}
        </TableCell>
      </TableRow>

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
      </Popover>  */}
    </>
  );
}

UserTableRow.propTypes = {
  info: PropTypes.any,
  avatarUrl: PropTypes.any,
  typeRequest: PropTypes.any,
  handleDelete: PropTypes.func,
  handleClick: PropTypes.func,
  expiredAt: PropTypes.any,
  typeLeave: PropTypes.any,
  startedAt: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
