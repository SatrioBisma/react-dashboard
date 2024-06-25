import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChartUpdate from "../../components/LineChartUpdate";

const LineUpdate = () => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChartUpdate />
      </Box>
    </Box>
  );
};

export default LineUpdate;
