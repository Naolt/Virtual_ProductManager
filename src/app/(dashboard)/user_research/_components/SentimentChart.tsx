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

// Register components required for chart.js bar chart
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type SentimentData = {
  positive: number;
  neutral: number;
  negative: number;
};

type SentimentChartProps = {
  sentimentData: SentimentData;
};

const SentimentChart: React.FC<SentimentChartProps> = ({ sentimentData }) => {
  // Bar chart configuration for sentiment analysis
  const data = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        label: "Sentiment",
        data: [
          sentimentData.positive,
          sentimentData.neutral,
          sentimentData.negative,
        ],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
        borderColor: ["#36A2EB", "#FFCE56", "#FF6384"],
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
          stepSize: 10, // Customize based on your data range
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div style={{ width: "500px", height: "fit-content" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SentimentChart;
