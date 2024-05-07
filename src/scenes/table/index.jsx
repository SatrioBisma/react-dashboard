import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const Tables = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();

    // Set up websocket connection
    const socket = io("ws://localhost:3001");
    
    // Listen for 'update' event from server
    socket.on('update', (newData) => {
      setData(newData);
      console.log(newData);
    });

    // Clean up websocket connection
    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://103.246.107.35:3002/drone/data');
      setData(response.data.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columns = [
    { field: "nomor", headerName: "No", align :"center", headerAlign: "center" },
    { field: "id_iot", headerName: "ID IoT" },
    { field: "timestamp", headerName: "Timestamp", flex: 0.5, align: "center", headerAlign: "center"},
    { field: "longitude", headerName: "Longitude",},
    { field: "latitude", headerName: "Latitude"},
    { field: "ch4", headerName: "CH4" },
    { field: "co2", headerName: "CO2" },
    { field: "n2o", headerName: "N2O" },
  ];

  return (
    <Box m="30px">
      <Header
        title="Tables"
        subtitle="List of Data for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.nomor} // Menggunakan properti 'no' sebagai id
        />

      </Box>
    </Box>
  );
};

export default Tables;
