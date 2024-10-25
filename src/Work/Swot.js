import React, { useEffect, useState } from 'react';

const TrendlyneWidget = () => {
  const [str, setStr] = useState('');
  const [inputText, setInputText] = useState('');
  const [data, setData] = useState([]);
  const [filteredValues, setFilteredValues] = useState([]);
  const [widg, setWidge] = useState('');
  const [name, setName] = useState('');
  const [tableVisible, setTableVisible] = useState(true); // New state for table visibility
  const [showbutton, setShowbutton] = useState(false);

  useEffect(() => {
    fetch('https://sheets.googleapis.com/v4/spreadsheets/1Vyx0O5atvsSMg9lqK-sH65Tb7vT3mcbyiNZ4A_ci_r8/values/Embed?alt=json&key=AIzaSyAq3ypn4xpDpaquusYVJ3e00OHhLnH7__k')
      .then(response => response.json())
      .then(response => {
        let values = response.values.slice(1);
        setData(values);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputText(value);

    if (value.trim() === '') {
      setFilteredValues([]);
      setTableVisible(false); // Hide the table if input is empty
    } else {
      const filtered = data.filter(row =>
        row.some(cell => cell.toLowerCase().includes(value.toLowerCase()))
      );
      setFilteredValues(filtered);
      setTableVisible(true); // Show the table when there are filtered values
    }
  };

  const handleClick = (value) => {
    setWidge(value); // Set the widget value
    setTableVisible(false); // Hide the table by setting its visibility to false
    setShowbutton(true)
  };

  const handleSwot = (buttonType) => {
    console.log(`${buttonType} button clicked`);
    // You can perform different actions based on the button type
    if (buttonType === 'swot') {
      // Handle SWOT button click
      const widgetHTML = `
          <blockquote
            class="trendlyne-widgets"
            data-get-url="https://trendlyne.com/web-widget/swot-widget/Poppins/${widg}/?posCol=00A25B&primaryCol=006AFF&negCol=EB3B00&neuCol=F7941E"
            data-theme="light">
          </blockquote>
        `;
      setStr(widgetHTML);

      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://cdn-static.trendlyne.com/static/js/webwidgets/tl-widgets.js';
      scriptElement.async = true;
      scriptElement.charset = 'utf-8';
      document.body.appendChild(scriptElement);

      return () => {
        document.body.removeChild(scriptElement);
      };
    } else if (buttonType === 'qvt') {
      // Handle QVT button click
      const widgetHTML = `
          <blockquote
            class="trendlyne-widgets"
            data-get-url="https://trendlyne.com/web-widget/qvt-widget/Poppins/${widg}/?posCol=00A25B&primaryCol=006AFF&negCol=EB3B00&neuCol=F7941E"
            data-theme="light">
          </blockquote>
        `;
      setStr(widgetHTML);

      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://cdn-static.trendlyne.com/static/js/webwidgets/tl-widgets.js';
      scriptElement.async = true;
      scriptElement.charset = 'utf-8';
      document.body.appendChild(scriptElement);

      return () => {
        document.body.removeChild(scriptElement);
      };
    } else if (buttonType === 'technical') {
      // Handle Technical button click
      const widgetHTML = `
      <blockquote
        class="trendlyne-widgets"
        data-get-url="https://trendlyne.com/web-widget/technical-widget/Poppins/${widg}/?posCol=00A25B&primaryCol=006AFF&negCol=EB3B00&neuCol=F7941E"
        data-theme="light">
      </blockquote>
    `;
      setStr(widgetHTML);

      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://cdn-static.trendlyne.com/static/js/webwidgets/tl-widgets.js';
      scriptElement.async = true;
      scriptElement.charset = 'utf-8';
      document.body.appendChild(scriptElement);

      return () => {
        document.body.removeChild(scriptElement);
      };
    } else if (buttonType === 'checklist') {
      // Handle Checklist button click
      const widgetHTML = `
          <blockquote
            class="trendlyne-widgets"
            data-get-url="https://trendlyne.com/web-widget/checklist-widget/Poppins/${widg}/?posCol=00A25B&primaryCol=006AFF&negCol=EB3B00&neuCol=F7941E"
            data-theme="light">
          </blockquote>
        `;
      setStr(widgetHTML);

      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://cdn-static.trendlyne.com/static/js/webwidgets/tl-widgets.js';
      scriptElement.async = true;
      scriptElement.charset = 'utf-8';
      document.body.appendChild(scriptElement);

      return () => {
        document.body.removeChild(scriptElement);
      };
    }
  }


  return (
    <div>
      {/* Input field for search */}
      <input
        type="text"
        onChange={handleInputChange}
        value={inputText}
        placeholder="Search..."
      />

      {/* Render the table if there are filtered values and tableVisible is true */}
      {tableVisible && filteredValues.length > 0 && (
        <table border="1" cellPadding="10">

          <tbody>
            {filteredValues.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td key={rowIndex} onClick={() => handleClick(row[1])}>{row[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showbutton && (
        <div>
          <button onClick={() => handleSwot('swot')}>SWOT</button>
          <button onClick={() => handleSwot('qvt')}>QVT</button>
          <button onClick={() => handleSwot('technical')}>TECHNICAL</button>
          <button onClick={() => handleSwot('checklist')}>CHECKLIST</button>
        </div>
      )}
      {/* Render the blockquote using dangerouslySetInnerHTML */}
      <div dangerouslySetInnerHTML={{ __html: str }} />
    </div>
  );
};

export default TrendlyneWidget;
