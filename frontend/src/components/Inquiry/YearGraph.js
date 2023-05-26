import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarController, BarElement } from "chart.js";

const YearGraph = ({ data, showGraph, settingStartdate, }) => {
  const [value,setValue]=useState(0);
  const dateArray = data
    .filter(data => data.state === 'RV')
    .map(data => data.date);

  const RVcountArray = data
    .filter(dt => dt.state === 'RV')
    .map(dt => dt.count);

  const IScountArray = data
    .filter(dt => dt.state === 'IS')
    .map(dt => dt.count);

  console.log(dateArray, RVcountArray, IScountArray)

  useEffect(() => {
    showGraph(settingStartdate('year',value));
  }, [value]);

  const data1 = {
    labels: dateArray,
    datasets: [
      {
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 99, 132, 1)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        data: RVcountArray
      },
      {
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(54, 162, 235, 1)",
        hoverBorderColor: "rgba(54, 162, 235, 1)",
        data: IScountArray
      }
    ]
  };
  const options = {
    legend: {
      display: false, // label 숨기기
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
          stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
        }
      }]
    },
    maintainAspectRatio: false // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
  }
  return (
    <Box>
      <Box>
        <Bar data={data1} options={options} />
      </Box>
      <Box>
        <Button onClick={() => setValue(value-1)}>left</Button>
        <Box>{dateArray[dateArray.length - 1]}</Box>
        <Button onClick={() => setValue(value+1)}>right</Button>
      </Box>
    </Box>
  );
};

export default YearGraph;