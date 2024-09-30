"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components for the bar chart
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type FeatureRequest = {
  feature: string;
  count: number;
};

const FeatureRequestBarChart: React.FC<{ requests: FeatureRequest[] }> = ({
  requests,
}) => {
  const data = {
    labels: requests.map((req) => req.feature),
    datasets: [
      {
        label: "Feature Requests",
        data: requests.map((req) => req.count),
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  return (
    <div style={{ width: "500px", height: "fit-content" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default FeatureRequestBarChart;
