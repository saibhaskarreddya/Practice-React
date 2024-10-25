import React from "react";
import HeatMap from "react-heatmap-grid";
function Demo() {
    // Labels for the X and Y axes
    const xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const yLabels = ["2024", "2023", "2022", "2021", "2020"];

    // Dummy data (5 years by 12 months)
    const data = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    ];
    return (
        <div>
            <center>
                Demo
                <div style={{ fontSize: "13px" }}>
      <HeatMap
        xLabels={xLabels}           // Month labels
        yLabels={yLabels}           // Year labels
        xLabelsLocation={"top"}     // Place the x-axis labels on the top
        xLabelWidth={60}            // Width of x-axis labels
        data={data}                 // Heatmap data
        squares                     // Display cells as squares
        height={45}                 // Height of each square
        cellStyle={(background, value, min, max) => ({
          background: `rgb(0, 151, 230, ${1 - (max - value) / (max - min)})`,  // Color gradient based on value
          fontSize: "11.5px",         // Font size for cell value
          color: "#444"               // Text color
        })}
        cellRender={value => value && <div>{value}</div>}  // Render cell values
      />
    </div>
            </center>

        </div>
    )
}

export default Demo;