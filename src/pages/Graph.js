import React, { useEffect, useState } from "react";
import * as echarts from "echarts";

function Investmentchart() {
    const [result, setResult] = useState([]); // For storing headings
    const [view, setView] = useState(false); // For showing the first dropdown
    const [selectedOption, setSelectedOption] = useState(""); // For 'Daily'/'Monthly'
    const [chartData, setChartData] = useState(null); // For chart data

    useEffect(() => {
        fetchChartData();
    }, []);

    const fetchChartData = async () => {
        try {
            const response = await fetch(
                "https://sheets.googleapis.com/v4/spreadsheets/1K0ZDMIrY-6AVH8aIr6YbHWB62AzllH5MeqUx9zdQ2Vs/values/totaldata?alt=json&key=AIzaSyAq3ypn4xpDpaquusYVJ3e00OHhLnH7__k"
            );
            const data = await response.json();
            // console.log(data)
            // Extract column names from the first row
            const headings = data.values[0].slice(2);
            const names = [];
            for (let i = 1; i < headings.length; i = i + 2) {
                names.push(headings[i] + ',' + i);
            }
            // console.log('names:', names);

            setResult(names); // Set headings for dropdown
            setChartData(data.values.slice(1)); // Store data for later chart use
            setView(true); // Show the dropdown
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Handle the view (Daily/Monthly) change
    function handleViewChange(event) {
        const selectedValue = event.target.value;
        // console.log("Selected View:", selectedValue);
        setSelectedOption(selectedValue);
    }

    // Handle selection from the second dropdown (based on `result` headings)
    function handleDropdownChange(event) {
        const selectedIndex = event.target.value;
        // console.log("Selected Index:", selectedIndex);
        // console.log("selectedOption:", selectedOption);
        const numberVal = parseInt(selectedIndex, 10);
        // console.log(numberVal)
        let started = '08';
        // console.log(chartData)
        console.log(chartData[0][1].split('/')[1])
        if (selectedOption === 'Daily') {
            let investmentData = [];
            let profitData = [];
            let dates12 = [];

            chartData.forEach(row => {
                // console.log(row[1])
                // console.log(row[numberVal + 1])
                let date = row[1];
                investmentData.push(Number(row[numberVal + 1]));
                profitData.push(Number(row[numberVal + 2]));
                dates12.push(date);
            });
            // console.log(investmentData)
            // console.log(profitData);

            // Call the function to update the chart
            updateChart(dates12, investmentData, profitData);
        }
        else {
            let month = chartData[0][1].split('/')[1];
            console.log(month);
            console.log(chartData);
            console.log('nograph');
            let investmentData = [];
            let profitData = [];
            let dates12 = [];
            chartData.forEach(row => {
                console.log(row[1].split('/')[1])
                if (row[1].split('/')[1] === started) {
                    let date = row[1];
                    investmentData.push(Number(row[numberVal + 1]));
                    profitData.push(Number(row[numberVal + 2]));
                    dates12.push(date);
                    started = (parseInt(started, 10) - 1).toString().padStart(2, '0');
                    if (started === '00') started = '12';
                }
                // console.log(row[1])
                // console.log(row[numberVal + 1])
                // let date = row[1];
                // investmentData.push(Number(row[numberVal+1]));
                // profitData.push(Number(row[numberVal + 2]));
                // dates12.push(date);
            });
            updateChart(dates12, investmentData, profitData);
        }
    }

    // Update the chart with the selected data
    const updateChart = (dates12, investmentData, profitData) => {
        var chartDom = document.getElementById('chart-container');
        var myChart = echarts.init(chartDom);

        const options = {
            color: ['#5470C6', '#EE6666'],
            tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
            grid: { left: '10%', right: '10%', top: '10%', bottom: '15%' },
            toolbox: { feature: { saveAsImage: { show: true } } },
            legend: { data: ['Price', 'Avg'] },
            xAxis: [{ type: 'category', boundaryGap: true, data: dates12, axisLabel: { interval: 0, rotate: 45 } }],
            yAxis: [{ type: 'value', name: 'Price' }, { type: 'value', name: 'Avg', position: 'right' }],
            dataZoom: [{ type: 'inside' }, { type: 'slider', show: true, start: 0, end: 100, height: 20, bottom: 10 }],
            series: [
                { name: 'Price', type: 'line', data: investmentData },
                {
                    name: 'Avg', type: 'bar', yAxisIndex: 1, data: profitData,
                    itemStyle: {
                        color: function (params) {
                            let value = params.value;
                            if (value >= 0 && value <= 0.2) return '#63BE7B';
                            if (value > 0.2 && value <= 0.4) return '#C6DB80';
                            if (value > 0.4 && value <= 0.6) return '#FFEF9C';
                            if (value > 0.6 && value <= 0.8) return '#FFA572';
                            return '#F8696B';
                        }
                    }
                }
            ]
        };

        myChart.setOption(options);
    };

    return (
        <div>
            <h1>Graph</h1>
            <div className="table-container">
                {view && (
                    <div>
                        <h1>Broad</h1>
                        <select id="daily" onChange={handleViewChange}>
                            <option value="" disabled selected hidden>Choose one</option>
                            <option value="Daily">Daily</option>
                            <option value="Monthly">Monthly</option>
                        </select>
                    </div>
                )}

                {selectedOption && (
                    <div>
                        <select id="index" onChange={handleDropdownChange}>
                            <option value="" disabled selected hidden>Choose one</option>
                            {result.map((name, index) => (
                                <option key={index} value={name.split(',')[1]}>
                                    {name.split(',')[0]}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div id="chart-container" style={{ width: "100%", height: "600px" }}></div>
        </div>
    );
}

export default Investmentchart;
