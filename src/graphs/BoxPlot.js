// components/BarChart.js
import { CircularProgress } from "@mui/material";
import { Line } from "react-chartjs-2";

export const BoxPlot = ({ chartData }) => {

  return (
    <div className="chart-container">
      { chartData ? <>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
            },
            legend: {
              display: false
            }
          }
        }}
        />
        </> : <CircularProgress/>}
    </div>
  );
};