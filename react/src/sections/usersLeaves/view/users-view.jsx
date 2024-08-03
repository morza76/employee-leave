import { useState, useEffect, useContext } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import { users } from 'src/_mock/user';
import AuthContext from 'src/Context/authContext';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UsersTableRow from '../users-table-row';
import UsersTableHead from '../users-table-head';
import TableEmptyRows from '../table-empty-rows';
import UsersTableToolbar from '../users-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UsersView() {
  const authContext = useContext(AuthContext);
  
  const [isLoading, setIsLoading] = useState(true)

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [usersLeaves, setUsersLeaves] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState({});

  // const [users, setUsers] = useState([]);

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = usersLeaves.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: usersLeaves,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;
  useEffect(() => {
    setIsLoading(true)
    if (authContext.roles[1]) {
      fetch(`http://localhost:3000/leaves/get-all-leave`, {
        method: 'GET',
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
            if(res.status === '401'){
              authContext.logout();
            }
          } else {
            return res.json();
          }
        })
        .then((res) => {
          setUsersLeaves(res)
          console.log(res);
        });

    }
    setIsLoading(false)

  },[authContext]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">درخواست های کارکنان</Typography>

        {/* <Button
          href="/create-leave"
          component={RouterLink}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          ایجاد مرخصی
        </Button> */}
      </Stack>

      {isLoading && <CircularProgress />}
      <Card>
        <UsersTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UsersTableHead
                order={order}
                orderBy={orderBy}
                rowCount={usersLeaves.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'نام', align: 'center' },
                  { id: 'position', label: 'موقعیت', align: 'center' },
                  { id: 'typeLeave', label: 'نوع مرخصی', align: 'center' },
                  { id: 'typeRequest', label: 'نوع درخواست', align: 'center' },
                  { id: 'startedAt', label: 'تاریخ شروع', align: 'center' },
                  { id: 'expiredAt', label: 'تاریخ پایان', align: 'center' },
                  { id: 'status', label: 'وضعیت', align: 'center' },
                  { id: 'more', label: 'بیشتر', align: 'center' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UsersTableRow
                      key={row.id}
                      info={row}
                      avatarUrl={row.avatarUrl}
                      name={row.name}
                      position={row.position}
                      typeLeave={row.typeLeave}
                      typeRequest={row.typeRequest}
                      startedAt={row.startedAt}
                      expiredAt={row.expiredAt}
                      status={row.status}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, usersLeaves.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          labelRowsPerPage="ردیف در صفحه"
          page={page}
          component="div"
          count={usersLeaves.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
