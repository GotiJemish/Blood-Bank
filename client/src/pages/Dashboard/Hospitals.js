import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import { CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";


const Hospitals = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //find donar records
  const getDonars = async () => {
    try {
      const { data } = await API.get("/inventory/get-hospitals");
      // console.log(data);
      if (data?.success) {
        setData(data?.hospitals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);


  const columns = [
    { id: 'hospitalName', label: 'Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'phone', label: 'Phone', minWidth: 100 },
    { id: 'address', label: 'Address', minWidth: 100 },
    {
      id: 'createdAt',
      label: 'Date',
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
    </Layout>
  );
};

export default Hospitals;
