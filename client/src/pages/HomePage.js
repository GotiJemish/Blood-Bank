import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Box, Button, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import API from '../services/API';
import Layout from '../components/shared/Layout/Layout';
import Model from '../components/shared/modal/Modal';
import Loader from '../components/shared/Loader';
import toast from 'react-hot-toast';

const HomePage = () => {
  const { loading, error, user } = useSelector(state => state.auth);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  // Fetch blood records
  const getBloodRecords = async () => {
    try {
      const response = await API.get('/inventory/get-inventory');
      if (response.data?.success) {
        setData(response.data.inventory);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  const columns = [
    { id: 'bloodGroup', label: 'Blood Group', minWidth: 170 },
    { id: 'inventoryType', label: 'Inventory Type', minWidth: 100 },
    {
      id: 'quantity',
      label: 'Quantity (ML)',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'email',
      label: 'Donar Email',
      minWidth: 170,
      align: 'right',
      format: (value) => value,
    },
    {
      id: 'updatedAt',
      label: 'Time & Date',
      minWidth: 170,
      align: 'right',
      format: (value) => moment(value).format('DD/MM/YYYY h:mm A'),
    },
  ];

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Layout>
      {user?.role === "admin" && navigate("/admin")}
      {error && toast.error(error)}
      {loading ? (
        <Loader />
      ) : (<>
        <Box sx={{ position: 'relative', mb: 2 }}>
          <Button
            sx={{ position: 'absolute', right: '20px', bottom: '10px' }}
            variant="contained"
            onClick={handleOpen}
          >
            Add Data
          </Button>
        </Box>

        <CssBaseline />

        <Paper sx={{ width: '100%' }}>
          <TableContainer sx={{ height: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : column.id === 'updatedAt'
                                ? moment(value).format('DD/MM/YYYY h:mm A')
                                : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <Model
          open={open}
          handleClose={handleClose}
          title="Manage Blood Record"
        />

      </>
      )}
    </Layout>
  );
};

export default HomePage;
