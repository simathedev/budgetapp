import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Typography, useTheme, Box } from "@mui/material";
import WidgetWrapper from "../../../components/WidgetWrapper";
import { registerCharts } from './registerCharts';
import DoughnutChart from "./DoughnutChart";

const ChartWidget = ({ balance, totalBalance }) => {
  registerCharts();
  return (
    <Box>
      <Typography variant="h4" padding="1rem">
        <div>
          <DoughnutChart balance={balance} totalBalance={totalBalance}/>
        </div>
      </Typography>

    </Box>
  );
};

export default ChartWidget;
