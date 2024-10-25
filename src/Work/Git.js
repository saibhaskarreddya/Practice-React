import React, { useState, useEffect } from "react";
import HeatMap from "react-heatmap-grid";

export default function MyComponents() {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOption1, setSelectedOption1] = useState('');
    const [name, setName] = useState([]);
    const [newgraph, setNewgraph] = useState([]);
    const [monthdata, setMonthdata] = useState([]);
    const [graphdata, setGraphdata] = useState([]);
    const [showmap1, setShowmap1] = useState(false);
    const [showmap2, setShowmap2] = useState(false);


    var dataArray = [];

    const myfun = () => {

        console.log(dataArray)

        console.log(name)

        var alldata = [];
        var monthdayscount = [];
        var keysArray = [];
        dataArray.forEach(obj => {
            Object.keys(obj).forEach(key => {
                if (!keysArray.includes(key)) {
                    keysArray.push(key);
                }
            });
        });
        console.log(keysArray);
        console.log(keysArray.slice(1).length)
        var datearray = [];

        var i = 11;
        var currentmonth = "01/2024";


        for (var k = 0; k < keysArray.slice(1).length; k++) {
            alldata[k] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            monthdayscount[k] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        console.log(dataArray[0].date)
        console.log(keysArray)
        dataArray.map((dat) => {
            datearray.push(dat.date);
            if (dat.date.includes(currentmonth)) {

                for (var m = 0; m < keysArray.slice(1).length; m++) {
                    alldata[m][i] += parseFloat(dat[keysArray[m + 1]]); // Assuming the keys in dataArray correspond to the names in the 'name' array
                    monthdayscount[m][i]++;
                }
                //Array[i]=Array[i]+row[stockheading[0]];
            }
            else {

                for (var m = 0; m < keysArray.slice(1).length; m++) {
                    alldata[m].push(parseFloat(dat[keysArray[m + 1]])); // Assuming the keys in dataArray correspond to the names in the 'name' array
                    monthdayscount[m].push(1);
                }
                i++;
                currentmonth = dat.date.substring(3);
            }
        })
        console.log(alldata);
        console.log(monthdayscount);

        setGraphdata(alldata);
        setMonthdata(monthdayscount);



    };


  

    useEffect(() => {
        fetch('http://localhost:8080/testcronpaymaa/testing/stocklist')
            .then(response => response.json())
            .then(json => {
                console.log(json.data.length);
                console.log(json.data[1].data);
                console.log(json.data[2].data);
                const tempDataArray = [];
                for (let j = 1; j < json.data.length; j++) {
                    // console.log('kl');
                    tempDataArray.push(JSON.parse(json.data[j].data));
                }
                dataArray = tempDataArray;
                console.log(dataArray)
                const parsedData = JSON.parse(json.data[0].data);
                const valuesArray = Object.values(parsedData);
                console.log(valuesArray.length)
                console.log(valuesArray.slice(1).length)
                // for(i=0;i<valuesArray)
                for (let i = 0; i < valuesArray.slice(1).length; i++) {
                    valuesArray[i] = valuesArray[i] + ",," + i;
                }
                console.log(valuesArray);

                setName(valuesArray.slice(1));

                myfun();


            })

            .catch(error => console.error(error));
    }, []);

    function handleSelectChange(event) {

        setShowmap1(true);
        setShowmap2(false);
        console.log(event.target.value.split(',,')[1])
        console.log("honadle function");


        var value = event.target.value;
        console.log(value)
        setSelectedOption(event.target.value);
        setSelectedOption1(value.split(',,')[1])

    };

    const renderHeatMap = () => {
        console.log(monthdata);
        


        if (selectedOption1 !== '') {

            console.log(graphdata[0])
            console.log(graphdata[0][0])
            console.log(graphdata[0][12]);
            const option = selectedOption1 - 1;
            const yLabels = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013"];
            const xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const data = [];
            for (let x = 0; x < 12; x++) {
                const tempdata = []
                for (let y = 11; y >= 0; y--) {
                    if (monthdata[option][12 * x + y] !== 0) {
                        const ratio = graphdata[option][12 * x + y] / monthdata[option][12 * x + y];
                        tempdata.push(parseFloat(ratio.toFixed(3)));

                    }
                    else {
                        tempdata.push(0);
                    }

                }
                data.push(tempdata);
            }
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
                        onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
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


    const renderHeatMap1 = () => {
       

        console.log(newgraph.length)

        if (newgraph.length === 17) {
            let namelabel = []
            let namelabels = []
            console.log("new graph");
            console.log(newgraph.length);
            console.log(name);


            name.forEach(data => {

                namelabel.push(data.split(",,")[0]);
            });
            namelabels = namelabel.slice(0, 17)
            if (newgraph.length > 0) {
                const yLabels = namelabels;
                const xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const data1 = [];
                for (let x = 0; x < 17; x++) {
                    const tempdata = [];
                    for (let y = 11; y >= 0; y--) {
                        tempdata.push(newgraph[x][y].toFixed(2));
                    }
                    data1.push(tempdata);
                }
                return (
                    <div style={{ fontSize: "13px" }}>
                        <HeatMap
                            xLabels={xLabels}
                            yLabels={yLabels}
                            xLabelsLocation={"top"}
                            xLabelWidth={60}
                            yLabelWidth={150}
                            data={data1}
                            squares
                            height={45}
                            onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
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
        }
        else if (newgraph.length === 23) {
            let namelabel = []
            let namelabels = []
            console.log("new graph");
            console.log(newgraph.length);
            console.log(name);


            name.forEach(data => {

                namelabel.push(data.split(",,")[0]);
            });
            namelabels = namelabel.slice(17, 40);
            if (newgraph.length > 0) {
                const yLabels = namelabels;
                const xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const data1 = [];
                for (let x = 0; x < 23; x++) {
                    const tempdata = [];
                    for (let y = 11; y >= 0; y--) {
                        tempdata.push(newgraph[x][y].toFixed(2));
                    }
                    data1.push(tempdata);
                }
                return (
                    <div style={{ fontSize: "13px" }}>
                        <HeatMap
                            xLabels={xLabels}
                            yLabels={yLabels}
                            xLabelsLocation={"top"}
                            xLabelWidth={60}
                            yLabelWidth={150}
                            data={data1}
                            squares
                            height={45}
                            onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
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




        }
        else if (newgraph.length === 29) {
            let namelabel = []
            let namelabels = []
            console.log("new graph");
            console.log(newgraph.length);
            console.log(name);


            name.forEach(data => {

                namelabel.push(data.split(",,")[0]);
            });
            namelabels = namelabel.slice(40, 69);
            if (newgraph.length > 0) {
                const yLabels = namelabels;
                const xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const data1 = [];
                for (let x = 0; x < 29; x++) {
                    const tempdata = [];
                    for (let y = 11; y >= 0; y--) {
                        tempdata.push(newgraph[x][y].toFixed(2));
                    }
                    data1.push(tempdata);
                }
                return (
                    <div style={{ fontSize: "13px" }}>
                        <HeatMap
                            xLabels={xLabels}
                            yLabels={yLabels}
                            xLabelsLocation={"top"}
                            xLabelWidth={60}
                            yLabelWidth={150}
                            data={data1}
                            squares
                            height={45}
                            onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
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


        }
        else {
            let namelabel = []
            let namelabels = []
            console.log("new graph");
            console.log(newgraph.length);
            console.log(name);


            name.forEach(data => {

                namelabel.push(data.split(",,")[0]);
            });
            namelabels = namelabel.slice(69, 88);
            if (newgraph.length > 0) {
                const yLabels = namelabels;
                const xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const data1 = [];
                for (let x = 0; x < 19; x++) {
                    const tempdata = [];
                    for (let y = 11; y >= 0; y--) {
                        tempdata.push(newgraph[x][y].toFixed(2));
                    }
                    data1.push(tempdata);
                }
                return (
                    <div style={{ fontSize: "13px" }}>
                        <HeatMap
                            xLabels={xLabels}
                            yLabels={yLabels}
                            xLabelsLocation={"top"}
                            xLabelWidth={60}
                            yLabelWidth={150}
                            data={data1}
                            squares
                            height={45}
                            onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
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

        }



        return null;


    };
    function button1() {

        setShowmap1(false);
        setShowmap2(true);
        alert("button1");
        let comparedata = [];

        graphdata.forEach(data => {

            comparedata.push(data.slice(12, 24));
        });
        let trimmeddata = [];

        trimmeddata = comparedata.slice(0, 17)
        setNewgraph(trimmeddata);
        console.log(comparedata.slice(0, 17));


    }

    function button2() {
        setShowmap1(false);
        setShowmap2(true);
        alert("button2");
        let comparedata = [];

        graphdata.forEach(data => {

            comparedata.push(data.slice(12, 24));
        });
        let trimmeddata = [];

        trimmeddata = comparedata.slice(17, 40)
        setNewgraph(trimmeddata);
        // console.log(comparedata.slice(0, 17));

    }

    function button3() {
        alert("button3");
         setShowmap1(false);
        setShowmap2(true);
        let comparedata = [];

        graphdata.forEach(data => {

            comparedata.push(data.slice(12, 24));
        });
        let trimmeddata = [];

        trimmeddata = comparedata.slice(40, 69)
        setNewgraph(trimmeddata);
    }

    function button4() {
        setShowmap1(false);
        setShowmap2(true);
        alert("button4");
        let comparedata = [];

        graphdata.forEach(data => {

            comparedata.push(data.slice(12, 24));
        });
        let trimmeddata = [];

        trimmeddata = comparedata.slice(69, 88)
        setNewgraph(trimmeddata);
    }


    return (
        <>

            <select value={selectedOption} onChange={handleSelectChange}>
                <option value="">Select an option</option>
                {name.slice(0, 17).map((value, index) => (
                    <option key={index} value={value}>{value.split(",,")[0]}</option>
                ))}
            </select>
            <button onClick={button1}>Comparedall_stocks</button><br />



            <select value={selectedOption} onChange={handleSelectChange}>
                <option value="">Select an option</option>
                {name.slice(17, 40).map((value, index) => (
                    <option key={index} value={value}>{value.split(",,")[0]}</option>
                ))}
            </select>
            <button onClick={button2}>Comparedall_stocks</button><br />

            <select value={selectedOption} onChange={handleSelectChange}>
                <option value="">Select an option</option>
                {name.slice(40, 69).map((value, index) => (
                    <option key={index} value={value}>{value.split(",,")[0]}</option>
                ))}
            </select>
            <button onClick={button3}>Comparedall_stocks</button><br />


            <select value={selectedOption} onChange={handleSelectChange}>
                <option value="">Select an option</option>
                {name.slice(69, 88).map((value, index) => (

                    <option key={index} value={value}>{value.split(",,")[0]}</option>
                ))}
            </select>
            <button onClick={button4}>Comparedall_stocks</button><br />

            
            {showmap1 && renderHeatMap()}
            {showmap2 && renderHeatMap1()}




        </>
    );
}