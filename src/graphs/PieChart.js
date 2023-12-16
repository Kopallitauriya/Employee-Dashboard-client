// components/BarChart.js
import { CircularProgress } from "@mui/material";
import { Pie } from "react-chartjs-2";

export const PieChart = ({ chartData }) => {

  return (
    <div className="chart-container">
      { chartData ? <>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Employee Count per Department"
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