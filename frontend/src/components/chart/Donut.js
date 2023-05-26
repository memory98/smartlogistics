import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Donut({ labels, label, data }) {
  const dataSet = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
        labels: {
          // This more specific font property overrides the global property
          // font: {
          //   size: 14,
          // },
        },
      },
      tooltip: {
        titleFont: {
          size: 12,
        },
        bodyFont: {
          size: 12,
        },
        footerFont: {
          // size: 10, // there is no footer by default
        },
        callbacks: {
          title: () => {
            return label;
          },
          label: (item) => {
            const count = item.dataset.data[item.dataIndex];
            const label = item.label;
            const info = ` ${label} : ${count}`;
            return info;
          },
        },
      },
    },
  };
  return (
    <>
      <div style={{ width: "150px", height: "150px", margin: "0 auto" }}>
        <Doughnut data={dataSet} options={options} />
      </div>
    </>
  );
}
