import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from "react-chartjs-2";
import dayjs from 'dayjs';
import DateController from './DateController';
import { customFetch } from '../custom/customFetch';

const DateGraph = ({ inquiry, page }) => {
  const [graph, setGraph] = useState('day');
  const [data, setData] = useState([]);  
  
  // dateArray = ["2023-01-01", ....]]
  const dateArray = data.filter(data => data.state === 'RV').map(data => data.date);
  const RVcountArray = data
    .filter(dt => dt.state === 'RV')
    .map(dt => dt.count);

  const IScountArray = data
    .filter(dt => dt.state === 'IS')
    .map(dt => dt.count);

  const sum = (arr) => {
    const a = arr.reduce((total, num) => total + num, 0);
    return a;
  }

  const [selectedBar, setSelectedBar] = useState([sum(IScountArray), sum(RVcountArray)]);
  // 현재 날짜 설정 value 만큼 계산
  const settingStartdate = (graph, value) => {
    const currentDate = new Date();
    
    if (graph === 'day') {
      currentDate.setDate(currentDate.getDate() + value);
    }

    if (graph === 'month') {
      currentDate.setMonth(currentDate.getMonth()  + value);
    }
    if (graph === 'year') {
      currentDate.setYear(currentDate.getFullYear() + value);
    }
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    console.log(year, month, day)
    return `${year}-${month}-${day}`;
  }

  const [startdate, setStartDate] = useState(settingStartdate('day', -6));

  // DatePicker의 값을 저장하는 메소드
  const settingdate = (date,value) => {
    var _date;
    const _dayjs = dayjs(date);
    if (graph === 'day') {
      _date = _dayjs.add(value, 'day').format();
      console.log(date);
    }

    if (graph === 'month') {
      _date = _dayjs.add(value, 'month').format();
    }
    if (graph === 'year') {
      _date = _dayjs.add(value, 'year').format();
    }
    _date = _date.split('T')[0];
    console.log(_date)
    return _date;
  }

  const onClickBefore = (e) => {
    console.log('onClickBefore')
    console.log(settingdate(startdate, -1))
    setStartDate(settingdate(startdate, -1));
  } 

  const onClickAfter = (e) => {
    console.log('onClickAfter')
    console.log(settingdate(startdate, 1))
    setStartDate(settingdate(startdate, 1));
  } 
  // 그래프를 그리기 위해 데이터 값을 받아오는 메소드

  const showGraph = async(startDate) => {
    console.log(33333)
    await customFetch(`/api/inquiry/graph?state=${graph}&startDate=${startDate}`, {method: 'post'}).then((json)=> {
      console.log(json.data)
      setData(json.data);
    })
  }

  // const showGraph = async (startDate) => {
  //   const data = {
  //     state: graph
  //   }
  //   try {
  //     const response = await fetch(`/api/inquiry/graph?state=${graph}&startDate=${startDate}`, {
  //       method: 'post',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //         Authorization: localStorage.getItem("token"),
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error(`${response.status} ${response.statusText}`);
  //     }

  //     const json = await response.json();

  //     if (json.result !== 'success') {
  //       throw new Error(`${json.result} ${json.message}`);
  //     }
  //     console.log(json.data);
  //     setData(json.data);
  //     setValue(0);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }

  //click 시 7일 기준으로 그래프를 보여주는 메소드
  const handleClickDay = (e) => {
    console.log("day 실행!!")

    console.log("=== dateArr in onClick!!! ==== ");
    console.log(dateArray);

    setGraph('day');
    setStartDate(settingStartdate('day', -6));
  }

  //click 시 달 기준으로 12달의 그래프를 보여주는 메소드
  const handleClickMonth = (e) => {
    console.log("month 실행!")
    setGraph('month');
    setStartDate(settingStartdate('month', -11));
  }

  //click 시 년 기준으로 5년의 그래프를 보여주는 메소드
  const handleClickYear = (e) => {
    console.log("year 실행!")
    setGraph('year');
    setStartDate(settingStartdate('year', -4));
  }

  // 그래프의 바를 클릭 시 Doughnut의 그래프가 보여지는 메소드
  const handleBarClick = (event, elements) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const RVcount = RVcountArray[clickedIndex];
      const IScount = IScountArray[clickedIndex];

      const selectedData = [IScount, RVcount];
      setSelectedBar(selectedData);
    }
  };

  useEffect(() => {
    setSelectedBar([sum(IScountArray), sum(RVcountArray)]);
    // console.log(data.filter(data => data.state === 'RV').map(data => data.date))
    // setDateArray(data.filter(data => data.state === 'RV').map(data => data.date));
    
  },[data]);

  useEffect(() => {
    showGraph(settingdate(startdate, 0));
    setSelectedBar([sum(IScountArray), sum(RVcountArray)]);
  }, [startdate]);



  const handleChangeDate = (date) => {
    if(graph==='day') {
      setStartDate(settingdate(date, -6));
    }
    if(graph==='month') {
      setStartDate(settingdate(date, -11));
    }
    if(graph==='year') {
      setStartDate(settingdate(date, -4));
    }
    setSelectedBar([sum(IScountArray), sum(RVcountArray)]);
  };

  const data1 = {
    labels: dateArray,
    datasets: [
      {
        label: '입고',
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
        hoverBorderColor: "rgba(255, 99, 132, 0.4)",
        data: RVcountArray,
        barThickness: 25 

      },
      {
        label: '출고',
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(54, 162, 235, 0.4)",
        hoverBorderColor: "rgba(54, 162, 235, 0.4)",
        data: IScountArray,
        barThickness: 25 

      }
    ]
  };

  const barOptions = {
    legend: {
      display: true, // label 숨기기
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0, // 스케일에 대한 최솟갓 설정, 0 부터 시작
          stepSize: 10, // 스케일에 대한 사용자 고정 정의 값
          max: 1000000
        },
        gridLines: {
          lineWidth: 0 //y축 격자선 없애기
        }
      }]
    },
    maintainAspectRatio: false, // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
    onClick: handleBarClick
  }

  const data2 = {
    // labels:['출고','입고'],
    datasets: [{
      data: selectedBar,
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 99, 132, 0.2)'

      ],
      hoverOffset: 4
    }]
  };

  const doughnutOptions = {
    type: 'doughnut',
    data: data,
    onClick: null
  };

  return (
    <Box>
      <Box
        sx={{
          height: 20,
          textAlign: 'center'
        }}>
        <Button
          sx={{
            height: 20,
            background: graph === 'day' ? '#0671F7' : '#fff',
            border: '1px solid #0671F7',
            borderRadius: '20px 0 0 20px',
            ':hover' : {
              background: graph === 'day' ? '#0671F7' : '#fff',  
            }
          }}
          onClick={handleClickDay}>
          <Box sx={{ color: graph === 'day' ? '#fff' : '#000' }}>
            <strong>D</strong>
          </Box>
        </Button>

        <Button
          sx={{
            height: 20,
            ml: 1,
            mr: 1,
            background: graph === 'month' ? '#0671F7' : '#fff',
            border: '1px solid #0671F7',
            borderRadius: '0',
            ':hover' : {
              background: graph === 'month' ? '#0671F7' : '#fff',  
            }
          }}
          onClick={handleClickMonth}>
          <Box sx={{ color: graph === 'month' ? '#fff' : '#000' }}>
            <strong>M</strong>
          </Box></Button>

        <Button
          sx={{
            height: 20,
            background: graph === 'year' ? '#0671F7' : '#fff',
            border: '1px solid #0671F7',
            borderRadius: '0 20px 20px 0',
            ':hover' : {
              background: graph === 'year' ? '#0671F7' : '#fff',  
            }
          }}
          onClick={handleClickYear}>
          <Box sx={{ color: graph === 'year' ? '#fff' : '#000' }}>
            <strong>Y</strong>
          </Box>
        </Button>
      </Box>
      <Box
        sx={{
          m: 5,
          height: inquiry ? '450px' : null,
          display: 'flex', // 가로 정렬을 위해 flex 속성 추가
          justifyContent: 'space-between' // 요소 사이의 간격을 동일하게 설정
        }}>
        <Box sx={{
          width: '70%'
        }}>
          <Bar data={data1} options={barOptions} />
        </Box>
        <Box
          sx={{
            m: 3
          }}>
          <Doughnut data={data2} options={doughnutOptions} />
        </Box>
      </Box>
      {
        page === 'inquiry' 
        ? 
        <DateController onClickBefore={onClickBefore} onClickAfter={onClickAfter} dateArray={dateArray} handleChangeDate={handleChangeDate}/>
        :
        null
      }
    </Box>
  );
};

export default DateGraph;