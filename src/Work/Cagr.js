import React, { useEffect, useState } from "react";

function Cagr() {
   
    const [result, setResult] = useState([]);
    const [matchingData, setMatchingData] = useState([]); // State to store data starting from where condition meets

    useEffect(() => {
        fetchChartData();
    }, []);

    const fetchChartData = async () => {
        try {
            const response = await fetch(
                "https://sheets.googleapis.com/v4/spreadsheets/1lRyemEwh9Ae90EMh4eo9pLsWxIJPe47s9FcQyus_6XE/values/cagr?alt=json&key=AIzaSyAq3ypn4xpDpaquusYVJ3e00OHhLnH7__k"
            );
            const data = await response.json();
            console.log("Fetched date from API:", data.values);
            let year = data.values[0][0].split('-')[2];
            let dat = []
            for (let i = 0; i < data.values.length; i++) {
                if (data.values[i][0].split('-')[2] == year) {
                    dat.push(data.values[i])
                }

            }

            setResult(dat);




            const apiDate = data.values[0][0]; // Assuming this is in "18-Oct-24" format

            // Parse the API date and calculate 4 years back
            const fourYearsBack = getFourYearsBack(apiDate);
            

            // Start pushing data from where the date matches the fourYearsBackDate
            const newMatchingData = [];
            let startPushing = false;
            // console.log(fourYearsBack.split('-')[2])
            let pre = fourYearsBack.split('-')[2];
            for (let i = 0; i < data.values.length; i++) {
                if (data.values[i][2] === fourYearsBack) {
                    startPushing = true; // Start pushing from this point
                }
                if (startPushing) {
                    if (data.values[i][2].split('-')[2] == pre)
                        newMatchingData.push(data.values[i]); // Push data when condition is met
                }
            }

            console.log(newMatchingData.length)
            console.log(dat.length)
            setMatchingData(newMatchingData);
            // Set the array to state

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getFourYearsBack = (dateStr) => {
        const [day, month, year] = dateStr.split('-');
        const months = {
            Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
            Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };

        const parsedYear = parseInt(year, 10) < 50 ? 2000 + parseInt(year, 10) : 1900 + parseInt(year, 10);
        const parsedDate = new Date(parsedYear, months[month], parseInt(day, 10));
        parsedDate.setFullYear(parsedDate.getFullYear() - 4);

        const dayFormatted = String(parsedDate.getDate()).padStart(2, '0');
        const monthFormatted = Object.keys(months).find(key => months[key] === parsedDate.getMonth());
        const yearFormatted = String(parsedDate.getFullYear()).slice(2);

        return `${dayFormatted}-${monthFormatted}-${yearFormatted}`;
    };

    return (
        <div>
            <center>
                <h1>CAGR</h1>
                <table border='1'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Price</th>
                            <th>CAGR</th>
                        </tr>
                    </thead>
                    {result.map((name, index) => (
                        <tr key={index}>
                            <td>{name[0]}</td>
                            <td>{name[1]}</td>
                            <td>
                                {matchingData[index] && !isNaN(name[1]) && !isNaN(matchingData[index][3])
                                    ? ((parseFloat(name[1]) - parseFloat(matchingData[index][3])) / parseFloat(matchingData[index][3])).toFixed(2)
                                    : 'N/A'}
                            </td>
                        </tr>
                    ))}
                </table>
            </center>
        </div>
    );
}

export default Cagr;
