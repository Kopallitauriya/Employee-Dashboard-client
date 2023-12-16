// components/BarChart.js
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

export const BarChart = ({ chartData }) => {

  return (
    <div className="chart-container">
      { chartData ? <>
      <Bar
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