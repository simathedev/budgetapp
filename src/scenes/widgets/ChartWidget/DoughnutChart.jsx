import { Doughnut } from "react-chartjs-2"
import {
  Box,
  Button,
  TextField,
  Grid,
  useMediaQuery,
  Typography,
  IconButton,
  Collapse,
  Alert,
  useTheme,
  } from "@mui/material";

const DoughnutChart = ({ balance, totalBalance }) => {
  const { palette } = useTheme();
  const labels = ["balance", "totalBalance"]
  const dataValues = [balance, totalBalance]

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          `${palette.primary.main}`,
          `${palette.neutral.mediumMain}`,
        ],
        borderColor: [
          `${palette.primary.main}`,
          `${palette.neutral.mediumMain}`,
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        display:false,
        position: "bottom",
      },
      title: {
        display: false,
        text: "Doughnut Chart: Monthly Sales",
      },
    },
  }

  return <Doughnut data={data} options={options} />
}

export default DoughnutChart