import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineCharts = () => {
  
  const ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Robot XYZ Acceleration Over Time',
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const [ChartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'X',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
        yAxisID: 'y1',
      },
      {
        label: 'Y',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
        yAxisID: 'y',
      },
      {
        label: 'Z',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
        yAxisID: 'y',
      },
    ]});

  const updateChart = async() => {
    await fetch('https://iscf-lab1-default-rtdb.europe-west1.firebasedatabase.app/Accel.json?orderBy="$key"&limitToLast=15')
    .then(response => response.json())
    .then(data => {
      const newData = Object.values(data).map(({ timestamp, x, y, z }) => ({
        timestamp: new Date(timestamp * 1000).toUTCString(), x, y, z})
      );
      setChartData({
        labels: newData.map(({ timestamp }) => timestamp),
        datasets: [
          {
            label: 'X',
            data: newData.map(({ x }) => x),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0.3,
            yAxisID: 'y1',
          },
          {
            label: 'Y',
            data: newData.map(({ y }) => y),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            tension: 0.3,
            yAxisID: 'y',
          },
          {
            label: 'Z',
            data: newData.map(({ z }) => z),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            tension: 0.3,
            yAxisID: 'y',
          },
        ]
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
  }

  const [intervalTime, setIntervalTime]= useState(5);
  const incInterval = () => {
    if(intervalTime < 20) {
      setIntervalTime(intervalTime + 1);
    }
  };
  const decInterval = () => {
    if(intervalTime > 2) {
      setIntervalTime(intervalTime - 1);
    }
  };

  useEffect(() => {
    const myInterval = setInterval(() => {
      updateChart();
    }, intervalTime * 1000);
    return () => clearInterval(myInterval);
  }, [intervalTime]);

  return (
    <>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col items-center border rounded-lg bg-white h-fit w-fit'>
          <div className='m-auto p-4' style={{width:'1280px',height:'720px'}}>
            <Line options={ChartOptions} data={ChartData}/>
          </div>
          <div className='flex bg-orange-500 rounded w-fit text-black text-sm'>
            <button className='hover:bg-orange-100 py-2 px-4 font-bold' onClick={decInterval}>-</button>
            <p className='py-2 px-4 bg-orange-100'>Refreshing data every {intervalTime} seconds</p>
            <button className='hover:bg-orange-100 py-2 px-4 font-bold' onClick={incInterval}>+</button>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default LineCharts