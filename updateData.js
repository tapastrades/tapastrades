// Sample data for open positions with allocation (replace with your actual data)
var openPositions = [
    { symbol: 'AAPL', openPrice: 150.00, percentChange: 2.33, allocation: 25, strategy: 'MomentumSystemic', color: 'rgba(243, 203, 75, 0.8)' },
    { symbol: 'GOOGL', openPrice: 2700.00, percentChange: -1.85, allocation: 13, strategy: 'MomentumSystemic', color: 'rgba(243, 203, 75, 0.8)' },
    // Add more positions as needed
];
function updateOpenPositions() {
    var openPositionsTable = document.getElementById('open-positions').getElementsByTagName('tbody')[0];

    // Clear the existing table rows
    openPositionsTable.innerHTML = '';

    // Loop through the open positions data and create table rows
    openPositions.forEach(function (position) {
        var row = openPositionsTable.insertRow();
        var symbolCell = row.insertCell(0);
        var openPriceCell = row.insertCell(1);
        var percentChangeCell = row.insertCell(2);
        symbolCell.style.fontSize = '13px';
        percentChangeCell.style.fontSize = '12px';
        symbolCell.style.color='white';
        openPriceCell.style.color = '#9084f5';
        openPriceCell.style.paddingLeft= '10px';
        percentChangeCell.style.paddingLeft= '60px';

        symbolCell.style.borderBottom = '1px solid rgba(160, 151, 240, 0.34)';        
        openPriceCell.style.borderBottom = '1px solid rgba(160, 151, 240, 0.34)';
        percentChangeCell.style.borderBottom = '1px solid rgba(160, 151, 240, 0.34)';
        
        symbolCell.textContent = position.symbol;
        openPriceCell.textContent = position.openPrice.toFixed(2);
        percentChangeCell.textContent = position.percentChange.toFixed(2) + '%';

        // Style the percentage change cell based on the value
        if (position.percentChange > 0) {
            percentChangeCell.style.color = '#86d18c'; // Green for positive change
        } else if (position.percentChange < 0) {
            percentChangeCell.style.color = '#eb5e6a'; // Red for negative change
        }
    });

    // Calculate percentages and create data for the pie chart
    var pieChartData = openPositions.map(function (position) {
        return {
            label: position.symbol,
            data: position.allocation,
            backgroundColor: getRandomColor() // Helper function to generate random colors
        };
    });

    // Calculate the total allocation percentage
    var totalAllocation = pieChartData.reduce(function (sum, dataItem) {
        return sum + dataItem.data;
    }, 0);

    // Calculate the free margin percentage
    var freeMarginPercentage = 100 - totalAllocation;

    // Add the free margin data item to the pieChartData array
    pieChartData.push({
        label: 'Free Margin',
        data: freeMarginPercentage,
        backgroundColor: 'rgba(136, 136, 142, 0.56)',
    });

    // Create a pie chart using Chart.js
    var ctx = document.getElementById('allocation-pie-chart').getContext('2d');
    var allocationPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: pieChartData.map(function (data) {
                return data.label;
            }),
            datasets: [{
                data: pieChartData.map(function (data) {
                    return data.data;
                }),
                backgroundColor: pieChartData.map(function (data) {
                    return data.backgroundColor;
                })
            }]
        },
        options: {
            maintainAspectRatio: false, // Disable aspect ratio to control width and height
            aspectRatio: 2, // Adjust this value to set the width (2 is just an example)
            cutout: '70%',
            plugins: {
                legend: {
                    display: false,
                }
            },
            animation: {
                animateScale: true,
            },
            hoverOffset: -20,
        }
    });

    var performanceTable = document.getElementById('strategy-bot').getElementsByTagName('tbody')[0];

    performanceTable.innerHTML = '';
    var perStrategy = {}
    // Loop through the open positions data and create table rows
    openPositions.forEach(function (position) {    
        if (position.strategy in perStrategy){
            perStrategy[position.strategy][0] += position.percentChange;
        }
        else {
            perStrategy[position.strategy] = [position.percentChange, position.color];
            
        }
    });

    for (var key in perStrategy) {
        var row = performanceTable.insertRow();

        var stratCell = row.insertCell(0);
        var performanceCell = row.insertCell(1);

        stratCell.textContent = key;
        performanceCell.textContent = perStrategy[key][0]+"%";
        stratCell.style.borderBottom = '1px solid rgba(160, 151, 240, 0.34)';        
        performanceCell.style.borderBottom = '1px solid rgba(160, 151, 240, 0.34)';

        stratCell.style.borderTop = '1px solid rgba(160, 151, 240, 0.34)';        
        performanceCell.style.borderTop = '1px solid rgba(160, 151, 240, 0.34)';

        stratCell.style.color = perStrategy[key][1];
        stratCell.style.paddingRight = '100px';

        performanceCell.style.paddingLeft = '150px';
        if (perStrategy[key][0] >= 0.0) {
            performanceCell.style.color = '#86d18c';
        }else{
            performanceCell.style.color = '#eb5e6a';
        }
    }

}


// Function to generate random colors for the pie chart
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getChartData() {

    // Get the chart canvas element
    var ctx = document.getElementById('myChart').getContext('2d');
        // Define a linear gradient for the fill color
    var gradient = ctx.createLinearGradient(0, 0, 0, 350); // Adjust the gradient coordinates as needed

    // Add color stops to create the gradient effect
    gradient.addColorStop(0, 'rgba(67, 60, 186, 0.7)'); // Start color (fully opaque)
    gradient.addColorStop(0.5, 'rgba(84, 76, 244, 0.4)'); // Middle color (semi-transparent)
    gradient.addColorStop(1, 'rgba(84, 76, 244, 0)'); // En

    var dataset1 = {
            label: 'Sample Data',
            data: [12, 19, 3, 5, 2, 3, 2, 10, 15, 18, 20],
            borderColor: 'blue', // Set the line color to blue
            pointBackgroundColor: 'blue', // Set the data point dot color to blue
            fill: true, // Disable fill under the line (optional)
            backgroundColor: gradient,
            borderWidth: 1,
            pointRadius: 0,
        }

        // Define a linear gradient for the fill color
    var gradient = ctx.createLinearGradient(0, 0, 0, 350); // Adjust the gradient coordinates as needed

    // Add color stops to create the gradient effect
    gradient.addColorStop(0, 'rgba(243, 203, 75, 0.7)'); // Start color (fully opaque)
    gradient.addColorStop(0.5, 'rgba(243, 203, 75, 0.4)'); // Middle color (semi-transparent)
    gradient.addColorStop(1, 'rgba(243, 203, 75, 0)'); // En

    var dataset2 = {
            label: 'Sample Data1',
            data: [9, 5, 8, 10, 5, 12, 9, 13, 8, 7, 9],
            borderColor: 'rgba(243, 203, 75, 0.8)', // Set the line color to blue
            pointBackgroundColor: 'rgba(243, 203, 75, 0.8)', // Set the data point dot color to blue
            backgroundColor: gradient,
            fill: true, // Disable fill under the line (optional)
            borderWidth: 1,
            pointRadius: 0,
        }

    // Sample data for the chart (replace with your data)
    var chartData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Orange', 'Orange', 'Orange','Orange', 'Orange' ],
        datasets: [dataset1, dataset2]
    };

     // Define multiple chart options
    var options1 = {
        // First set of options
        scales: {
            x: {
                display: false, // Hide x-axis labels and ticks
            },
            y: {
                display: false, // Hide y-axis labels and ticks
            }
        }
    };
    var options2 = {
            // Second set of options
            plugins: {
                legend: {
                    position: 'top', // Move the legend to the left
                    align: 'start',
                    labels: {
                        color: 'rgba(226, 255, 255, 1)',
                        font: {
                            weight: 'bold',
                            size: 10,
                            family: 'urban, sans-serif',
                            
                        }
                    }
                }
            }
        };

    // Merge the options objects into one
    var combinedOptions = Object.assign({}, options1, options2);

    // Create and update the chart
    var myChart = new Chart(ctx, {
        type: 'line', // Change to the chart type you want (e.g., 'bar', 'line', 'pie', etc.)
        data: chartData,
        options: combinedOptions,
    });
    // Wait for the chart to finish rendering
    myChart.update();   
}
// Example function to calculate the sum value (replace this with your own logic)
function calculateSumValue() {
    // Replace with your logic to calculate the sum value
    const sumValue = 1234.56;
    return "₹ " + sumValue.toFixed(2); // Format the sum value as needed
}


// Function to read a text file and parse its content into a dictionary
function readTextFileAndCreateDictionary(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');

    const dictionary = {};

    lines.forEach((line) => {
      const [key, value] = line.split(':').map((item) => item.trim());
      if (key && value) {
        dictionary[key] = value;
      }
    });

    return dictionary;
  } catch (error) {
    console.error('Error reading the file:', error.message);
    return {};
  }
}

// Function to update the dynamic text
function updateDynamicText() {
    // const fs = require('fs');

    // Replace these values with actual data from your source
    const currentPrice = 100; // Replace with the current price
    const previousPrice = 97.7; // Replace with the previous price

    const percentChange = ((currentPrice - previousPrice) / previousPrice * 100).toFixed(2);

    // Get the selected time period from the dropdown
    const selectedTimePeriodElem = document.getElementById("time-period-select");
    const selectedTimePeriod = selectedTimePeriodElem.value
    if (selectedTimePeriod == "this-week"){
        selectedTimePeriodElem.style.width = "170px";
    }
    else if (selectedTimePeriod == "this-month"){
        selectedTimePeriodElem.style.width = "190px";
    }
    else if (selectedTimePeriod == "3-months"){
        selectedTimePeriodElem.style.width = "200px";
    }
    else if (selectedTimePeriod == "6-months"){
        selectedTimePeriodElem.style.width = "205px";
    }
    else if (selectedTimePeriod == "this-year"){
        selectedTimePeriodElem.style.width = "160px";
    }

    // Set the change status based on the data (you can implement your own logic)
    const changeStatus = percentChange >= 0 ? "up" : "down";

    // Update the dynamic text
    const changeDircElem = document.getElementById("change-status");
    const percentChangeElem = document.getElementById("percent-change");
    const sumValueElement = document.getElementById("sum-value"); // Get the sum-value element
    const sumBoxElem = document.querySelector(".sum-box");
    if (changeStatus == "up"){
        changeDircElem.style.color = "#86d18c";
        changeDircElem.textContent = changeStatus;
        percentChangeElem.style.color = "#86d18c";
        sumBoxElem.style.background = "#86d18c";
    }
    else if (changeStatus == "down"){
        changeDircElem.style.color = "#eb5e6a";
        changeDircElem.textContent = changeStatus;
        percentChangeElem.style.color = "#eb5e6a";
        sumBoxElem.style.background = "#eb5e6a";
    }
    percentChangeElem.textContent = `${Math.abs(percentChange)}%`;

    // Set the value for sum-value
    const sumValue = calculateSumValue(); // Replace with your logic to calculate the sum value
    sumValueElement.textContent = sumValue; // Set the sum value text

    getChartData();
    updateOpenPositions();
}



// Add an event listener to the dropdown for updating the text when a new time period is selected
document.getElementById("time-period-select").addEventListener("change", updateDynamicText);

document.addEventListener("DOMContentLoaded", function() {
    fetch('balanceCurve.txt')
      .then(response => response.text())
      .then(data => {
        // Process the data from the file
        console.log(data);
      })
      .catch(error => {
        console.error('Error reading the file:', error);
      });

    // Call the function to update the text and chart when the DOM is ready
    updateDynamicText();
});


