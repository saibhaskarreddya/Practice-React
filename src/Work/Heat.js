import React, { useEffect, useState } from "react";
import HeatMap from "react-heatmap-grid";
import anychart from 'anychart';


export default function HeatMaps() {
  const [data1, setData1] = useState([]);
  const [alldata, setAlldata] = useState([]);
  const [monthdayscount, setMonthdayscount] = useState([]);
  const [headings, setHeadings] = useState([]);
  const [showdropdown, setShowdropdown] = useState(false);
  const [graphobject, setGraphobject] = useState([]);
  const [showmap1, setShowmap1] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [resp, setResp] = useState('');


  useEffect(() => {
    fetchChartData();

  }, []);

  const fetchChartData = async () => {
    try {
      const response = await fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/1lPjk0uEU2NGU8TybTq9qZ5a2rPNSAo_UTP3ojpcUW9g/values/heatccsv1?alt=json&key=AIzaSyAq3ypn4xpDpaquusYVJ3e00OHhLnH7__k"
      );
      const data = await response.json();
      console.log(data)
      let values = data.values.slice(1)
      console.log(values)
      let filteredData = values.filter(row => {
        let dateParts = row[0].split('-');
        let year = parseInt(dateParts[2]);
        return year >= 2014;
      });
      console.log(filteredData);
      setData1(filteredData);
      let stockheading = data.values[0].slice(1);
      console.log(stockheading);
      let mappedStockHeading = stockheading.map((item, index) => {
        // Split each item by comma and space and add index value
        return item.split(', ') + ",," + index;
      });

      console.log(mappedStockHeading)
      setHeadings(mappedStockHeading)
      let i;
      let currentmonth = filteredData[1][0].split('-')[1];
      console.log(currentmonth);
      let all = [];
      let month = []
      for (let k = 0; k < stockheading.length; k++) {
        if (currentmonth == '01') {
          i = 11;
          all[k] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          month[k] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        }
        else if (currentmonth == '02') {
          i = 10;
          all[k] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          month[k] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        }
        else if (currentmonth == '03') {
          i = 9;
          all[k] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          month[k] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        }
        else if (currentmonth == '04') {
          i = 8;
          all[k] = [0, 0, 0, 0, 0, 0, 0, 0, 0,];
          month[k] = [0, 0, 0, 0, 0, 0, 0, 0, 0,];

        }
        else if (currentmonth == '05') {
          i = 7;
          all[k] = [0, 0, 0, 0, 0, 0, 0, 0,];
          month[k] = [0, 0, 0, 0, 0, 0, 0, 0,];

        }
        else if (currentmonth == '06') {
          i = 6;
          all[k] = [0, 0, 0, 0, 0, 0, 0,];
          month[k] = [0, 0, 0, 0, 0, 0, 0,];

        }
        else if (currentmonth == '07') {
          i = 5;
          all[k] = [0, 0, 0, 0, 0, 0,];
          month[k] = [0, 0, 0, 0, 0, 0,];

        }
        else if (currentmonth == '08') {
          i = 4;
          all[k] = [0, 0, 0, 0, 0,];
          month[k] = [0, 0, 0, 0, 0,];

        }
        else if (currentmonth == '09') {
          i = 3;
          all[k] = [0, 0, 0, 0,];
          month[k] = [0, 0, 0, 0,];

        }
        else if (currentmonth == '10') {
          i = 2;
          all[k] = [0, 0, 0,];
          month[k] = [0, 0, 0,];

        }
        else if (currentmonth == '11') {
          i = 1;
          all[k] = [0, 0,];
          month[k] = [0, 0,];

        }

        else if (currentmonth == '12') {
          i = 0;
          all[k] = [0];
          month[k] = [0];

        }

        // setMonthdayscount(month);

      }
      console.log(all)
      console.log(values)
      
      console.log(data1)
      console.log('hi')
      console.log(currentmonth)
      console.log(stockheading.length)

      console.log(filteredData)
      filteredData.map(row => {
        if (row[0] != null) {
          if (row[0].includes(currentmonth)) {
            for (let k = 0; k < stockheading.length; k++) {
              let val = parseFloat(row[k + 1]);
              if (!isNaN(val)) {
                all[k][i] += val;
                month[k][i]++;
              }
            }
          } else {
            for (let k = 0; k < stockheading.length; k++) {
              let vall = parseFloat(row[k + 1]);
              if (!isNaN(vall)) {
                all[k].push(vall);
                month[k].push(1);
              }
              else {
                all[k].push(0);
                month[k].push(1)
              }
            }
            i++;
            currentmonth = row[0].substring(3);
          }
        }
      })

      console.log(all)
      // console.log(month)
      console.log(0 / 0)
      setAlldata(all);
      setShowdropdown(true)



    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // fetch('https://sheets.googleapis.com/v4/spreadsheets/1lPjk0uEU2NGU8TybTq9qZ5a2rPNSAo_UTP3ojpcUW9g/values/heatccsv1?alt=json&key=AIzaSyAq3ypn4xpDpaquusYVJ3e00OHhLnH7__k')
  //   .then(response => response.json())
  //   .then(response => {
  //     let values = response.values.slice(1)
  //     console.log(values)
  //     let filteredData = values.filter(row => {
  //       let dateParts = row[0].split('-');
  //       let year = parseInt(dateParts[2]);
  //       return year >= 2014;
  //     });
  //     console.log(filteredData);
  //     setData(filteredData);
  //     let stockheading = response.values[0].slice(1);
  //     console.log(stockheading);
  //     let mappedStockHeading = stockheading.map((item, index) => {
  //       // Split each item by comma and space and add index value
  //       return item.split(', ') + ",," + index;
  //     });

  //     console.log(mappedStockHeading)
  //     setHeadings(mappedStockHeading)
  //     let i;
  //     let currentmonth = filteredData[1][0].split('-')[1];
  //     console.log(currentmonth);
  //     let all = [];
  //     let month = []
  //     for (let k = 0; k < stockheading.length; k++) {
  //       if (currentmonth == '01') {
  //         i = 11;
  //         all[k] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  //         month[k] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  //       }
  //       else if (currentmonth == '02') {
  //         i = 10;
  //         all[k] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  //         month[k] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  //       }
  //       else if (currentmonth == '03') {
  //         i = 9;
  //         all[k] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  //         month[k] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  //       }
  //       else if (currentmonth == '04') {
  //         i = 8;
  //         all[k] = [0, 0, 0, 0, 0, 0, 0, 0, 0,];
  //         month[k] = [0, 0, 0, 0, 0, 0, 0, 0, 0,];

  //       }
  //       else if (currentmonth == '05') {
  //         i = 7;
  //         all[k] = [0, 0, 0, 0, 0, 0, 0, 0,];
  //         month[k] = [0, 0, 0, 0, 0, 0, 0, 0,];

  //       }
  //       else if (currentmonth == '06') {
  //         i = 6;
  //         all[k] = [0, 0, 0, 0, 0, 0, 0,];
  //         month[k] = [0, 0, 0, 0, 0, 0, 0,];

  //       }
  //       else if (currentmonth == '07') {
  //         i = 5;
  //         all[k] = [0, 0, 0, 0, 0, 0,];
  //         month[k] = [0, 0, 0, 0, 0, 0,];

  //       }
  //       else if (currentmonth == '08') {
  //         i = 4;
  //         all[k] = [0, 0, 0, 0, 0,];
  //         month[k] = [0, 0, 0, 0, 0,];

  //       }
  //       else if (currentmonth == '09') {
  //         i = 3;
  //         all[k] = [0, 0, 0, 0,];
  //         month[k] = [0, 0, 0, 0,];

  //       }
  //       else if (currentmonth == '10') {
  //         i = 2;
  //         all[k] = [0, 0, 0,];
  //         month[k] = [0, 0, 0,];

  //       }
  //       else if (currentmonth == '11') {
  //         i = 1;
  //         all[k] = [0, 0,];
  //         month[k] = [0, 0,];

  //       }

  //       else if (currentmonth == '12') {
  //         i = 0;
  //         all[k] = [0];
  //         month[k] = [0];

  //       }
  //       // console.log(all)
  //       setAlldata(all);
  //       // setMonthdayscount(month);

  //     }

  //     // console.log(data)
  //     const yLabels = data.map(row => {

  //       // console.log(row)
  //       // console.log(row[0])
  //       // console.log(row[1] + row[2]);
  //       // console.log(currentmonth)
  //       if (row[0] != null) {
  //         if (row[0].includes(currentmonth)) {
  //           // console.log(row)
  //           for (var k = 0; k < stockheading.length; k++) {
  //             // Convert the value to a number before adding
  //             var value = parseFloat(row[k + 1]);
  //             // Check if the parsed value is a valid number
  //             if (!isNaN(value)) {
  //               alldata[k][i] += value;
  //               monthdayscount[k][i]++;
  //             }
  //           }
  //         } else {
  //           for (var k = 0; k < stockheading.length; k++) {
  //             // Convert the value to a number before pushing
  //             var value = parseFloat(row[k + 1]);
  //             // Check if the parsed value is a valid number
  //             if (!isNaN(value)) {
  //               alldata[k].push(value);
  //               monthdayscount[k].push(1);
  //             }
  //             else {
  //               alldata[k].push(0);
  //               monthdayscount[k].push(1);
  //             }
  //           }
  //           i++;
  //           currentmonth = row[0].substring(3);
  //           // console.log(currentmonth)
  //         }
  //       }
  //       // console.log("i=" + i);

  //       // console.log(alldata[0][2])
  //     });
  //     console.log(alldata)
  //     setShowdropdown(true)
  //   })
  //   .catch(error => {
  //     console.error('Error fetching data:', error);
  //   });




  function handleDropdownChange(event, dropdownNumber) {
    const selectedValue = event.target.value;
    console.log(selectedValue)
    console.log(`Dropdown ${dropdownNumber} selected: `, selectedValue);
    let res = []
    let index = selectedValue;
    for (let i = 0; i < alldata[0].length; i += 12) {
      res.push(alldata[index].slice(i, i + 12).map(num => parseFloat(num).toFixed(2)));
    }

    console.log(res);
    setResp(res)
    setSelectedOption(event.target.value);

    setShowmap1(true);
    // showheatmap(selectedValue);
    // You can add additional logic here based on the selected value
  }

  const renderHeatMap = () => {
    if (selectedOption !== '') {
      const data = resp;
      console.log(selectedOption)
      // console.log(dummyData['Stock A' ])
      const yLabels = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014"];
      const xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return (
        <div style={{ fontSize: "13px" }}>
          <HeatMap
            xLabels={xLabels}
            yLabels={yLabels}
            xLabelsLocation={"top"}
            xLabelWidth={60}
            data={data}
            squares
            height={45}
            cellStyle={(background, value, min, max, data, x, y) => ({
              background: `rgb(0, 151, 230, ${1 - (max - value) / (max - min)})`,
              fontSize: "11.5px",
              color: "#444"
            })}
            cellRender={value => value && <div>{value}</div>}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <h1>Heatmap</h1>
      <div>
        <h1>Broad</h1>

        {showdropdown && (
          <>
            <select id="daily" defaultValue="" onChange={(e) => handleDropdownChange(e, 1)}>
              <option value="" disabled hidden>Choose one</option>
              {headings.slice(0, 17).map((name, index) => (
                <option key={index} value={name.split(',,')[1]}>
                  {name.split(',')[0]}
                </option>
              ))}
            </select>
            <select id="daily" defaultValue="">
              <option value="" disabled hidden>Choose one</option>
              {headings.slice(17, 40).map((name, index) => (
                <option key={index} value={name.split(',')[1]}>
                  {name.split(',')[0]}
                </option>
              ))}
            </select>
            <select id="daily" defaultValue="">
              <option value="" disabled hidden>Choose one</option>
              {headings.slice(40, 69).map((name, index) => (
                <option key={index} value={name.split(',')[1]}>
                  {name.split(',')[0]}
                </option>
              ))}
            </select>
            <select id="daily" defaultValue="">
              <option value="" disabled hidden>Choose one</option>
              {headings.slice(69, 88).map((name, index) => (
                <option key={index} value={name.split(',')[1]}>
                  {name.split(',')[0]}
                </option>
              ))}
            </select>
          </>
        )

        }
        {showmap1 && renderHeatMap()}

      </div>
    </>
  )
}

// import React, { useState } from "react";
// import HeatMap from "react-heatmap-grid";

// export default function MyComponent() {
//     const [selectedOption, setSelectedOption] = useState('');
//     const [showmap1, setShowmap1] = useState(false);
//     const dummyData = {
//         "Stock A": [
//             [100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155], // 2024
//             [90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112]      // 2023
//         ],
//         "Stock B": [
//             [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105],          // 2024
//             [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62]             // 2023
//         ],
//         "Stock C": [
//             [200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310], // 2024
//             [180, 185, 190, 195, 200, 205, 210, 215, 220, 225, 230, 235]  // 2023
//         ]
//     };

//     const handleSelectChange = (event) => {
//         setSelectedOption(event.target.value);
//         setShowmap1(true);
//     };

//     const renderHeatMap = () => {
//         if (selectedOption !== '') {
//             const data = dummyData[selectedOption];
//             console.log(selectedOption)
//             console.log(dummyData['Stock A' ])
//             const yLabels = ["2024", "2023"];
//             const xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//             return (
//                 <div style={{ fontSize: "13px" }}>
//                     <HeatMap
//                         xLabels={xLabels}
//                         yLabels={yLabels}
//                         xLabelsLocation={"top"}
//                         xLabelWidth={60}
//                         data={data}
//                         squares
//                         height={45}
//                         cellStyle={(background, value, min, max, data, x, y) => ({
//                             background: `rgb(0, 151, 230, ${1 - (max - value) / (max - min)})`,
//                             fontSize: "11.5px",
//                             color: "#444"
//                         })}
//                         cellRender={value => value && <div>{value}</div>}
//                     />
//                 </div>
//             );
//         }
//         return null;
//     };

//     return (
//         <div>
//             <select value={selectedOption} onChange={handleSelectChange}>
//                 <option value="">Select a Stock</option>
//                 <option value="Stock A">Stock A</option>
//                 <option value="Stock B">Stock B</option>
//                 <option value="Stock C">Stock C</option>
//             </select>

//             {showmap1 && renderHeatMap()}
//         </div>
//     );
// }

