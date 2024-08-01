import React, { useState, useEffect } from "react";
import API from "../../services/API";
import moment from "moment";
import Layout from "../../components/shared/Layout/Layout";
import { Box, Card, CardContent, Chip, Grid, Typography, CssBaseline, Paper, Table, TableBody, TableCell,
   TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";


import Loader from "../../components/shared/Loader";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const logoStyle = {
    maxWidth: "100%",
    height: "auto",
  };

  // GET BLOOD GROUP DATA
  const getBloodGroupData = async () => {
    try {
      const response = await API.get("/analytics/bloodGroups-data");
      if (response.data?.success) {
        setData(response.data.bloodGroupData);

      } else {
        setError("Failed to fetch blood group data.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // GET BLOOD RECORDS
  const getBloodRecords = async () => {
    try {
      const response = await API.get("/inventory/get-recent-inventory");

      if (response.data?.success) {
        setInventoryData(response.data.inventory);
      } else {
        setError("Failed to fetch inventory data.");
      }
    } catch (err) {
      setError(err.message);
    }
    // console.log(data)
  };

  useEffect(() => {
    getBloodGroupData();
    getBloodRecords();
  }, []);

  const columns = [
    { id: "bloodGroup", label: "Blood Group", minWidth: 170 },
    { id: "inventoryType", label: "Inventory Type", minWidth: 100 },
    { id: "quantity", label: "Quantity (ML)", minWidth: 100 },
    { id: "email", label: "Donar Email", minWidth: 100 },
    {
      id: "createdAt",
      label: "Time & Date",
      minWidth: 170,
      align: "right",
      format: (value) => moment(value).format("YYYY-MM-DD HH:mm:ss"),
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
      <Box sx={{ minHeight: "100vh" }}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Typography color="error" variant="h6" align="center">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {data.map((record, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card
                  sx={{
                    maxWidth: 400,
                    boxShadow: 3,
                    borderRadius: 2,
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Box sx={{display: "flex",flexDirection: "column",alignItems: "center", }} >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Box width={"50%"}>
                          <img
                            src={`/assets/images/bloodgroup/${record.bloodGroup}.png`}

                            style={logoStyle}
                            alt={`${record.bloodGroup} icon`}

                          />
                        </Box>



                        <Box
                          width={"50%"}
                          sx={{
                            display: "flex",
                            flexDirection: {
                              xs: "row",
                              sm: "column",
                            },
                            gap: { xs: 2, sm: 0 },
                            textAlign: "center",
                          }}
                        >
                          <Box>
                            <Typography
                              sx={{ fontSize: 16, fontWeight: "bold" }}
                              color="text.secondary"
                              gutterBottom
                            >
                              Total In
                            </Typography>
                            <Chip label={`${record.totalIn} (ML)`} />
                          </Box>
                          <Box>
                            <Typography
                              sx={{ fontSize: 16, fontWeight: "bold" }}
                              color="text.secondary"
                              gutterBottom
                            >
                              Total Out

                            </Typography>
                            <Chip
                              label={`${record.totalOut} (ML)`}
                              variant="outlined"
                            />
                          </Box>


                        </Box>



                      </Box>








                      <Box component="div"
                        p="4px"
                        width={"200px"}
                        sx={{
                          fontWeight: "bold",
                          backgroundColor: "green",
                          color: "white",
                          borderRadius: 1,
                          textAlign: "center",
                          marginTop: 2,
                        }}>
                        <Typography
                          variant="h6"

                        >
                          Total Available: {record.availabeBlood} (ML)

                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ mt: 4 }}>
          <Box>
            <p variant="h5" >
              Recent Blood Transactions
            </p>

          </Box>

          <CssBaseline />
          <Paper sx={{ width: "100%" }}>
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
                  {inventoryData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : column.id === "createdAt"
                                  ? moment(value).format("YYYY-MM-DD HH:mm:ss")
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
              count={inventoryData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Box>
    </Layout>
  );
};

export default Analytics;
