// Sample data for open positions with allocation (replace with your actual data)
var openPositions = [
    { symbol: 'AAPL', openPrice: 150.00, percentChange: 2.33, allocation: 25, strategy: 'MomentumSystemic', color: 'rgba(243, 203, 75, 0.8)' },
    { symbol: 'GOOGL', openPrice: 2700.00, percentChange: -1.85, allocation: 13, strategy: 'MomentumSystemic', color: 'rgba(243, 203, 75, 0.8)' },
    // Add more positions as needed
];
function updateOpenPositions(openPositions) {
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

    var existingChart = Chart.getChart("allocation-pie-chart");

    // Check if the chart exists and destroy it
    if (existingChart) {
      existingChart.destroy();
    }

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

function getChartData(stdBalance,stdNifty,date) {

    // Assuming you have an existing chart with the ID 'myChart'
    var existingChart = Chart.getChart("myChart");

    // Check if the chart exists and destroy it
    if (existingChart) {
      existingChart.destroy();
    }

    // Get the chart canvas element
    var ctx = document.getElementById('myChart').getContext('2d');
        // Define a linear gradient for the fill color
    var gradient = ctx.createLinearGradient(0, 0, 0, 350); // Adjust the gradient coordinates as needed

    // Add color stops to create the gradient effect
    gradient.addColorStop(0, 'rgba(67, 60, 186, 0.7)'); // Start color (fully opaque)
    gradient.addColorStop(0.5, 'rgba(84, 76, 244, 0.4)'); // Middle color (semi-transparent)
    gradient.addColorStop(1, 'rgba(84, 76, 244, 0)'); // En

    var dataset1 = {
            label: 'Nifty 50',
            data: stdNifty,
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
            label: 'Strategy Performance',
            data: stdBalance,
            borderColor: 'rgba(243, 203, 75, 0.8)', // Set the line color to blue
            pointBackgroundColor: 'rgba(243, 203, 75, 0.8)', // Set the data point dot color to blue
            backgroundColor: gradient,
            fill: true, // Disable fill under the line (optional)
            borderWidth: 1,
            pointRadius: 0,
        }

    // Sample data for the chart (replace with your data)
    var chartData = {
        labels: date,
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
function calculateSumValue(c, p) {
    // Replace with your logic to calculate the sum value
    const sumValue = c - p;
    return "₹ " + sumValue.toFixed(2); // Format the sum value as needed
}

function convertK(inputString){
    // Remove the "k" character
    const stringWithoutK = inputString.replace("k", "");
    // console.log(stringWithoutK)
    // Convert the string to an integer
    const integerValue = parseFloat(stringWithoutK, 10);
    return integerValue*1000
}
// Function to update the dynamic text
function updateDynamicText() {
    
    const getList = async () => {
        return new Promise((resolve, reject) => {
            fetch('balanceCurve.txt')
              .then(response => response.text())
              .then(data => {
                // Process the data from the file
                const lines = data.split("\n");
                const list = lines;
                // console.log(list);
                resolve(list);
              })
              .catch(error => {
                console.error('Error reading the file:', error);
                reject(error); // Reject the promise if an error occurs
              });
          });
        };
    var dataList = [];    
    // Usage example:
    getList()
      .then(list => {
        
        var itemsToTake = 1
        // Get the selected time period from the dropdown
        const selectedTimePeriodElem = document.getElementById("time-period-select");
        const selectedTimePeriod = selectedTimePeriodElem.value
        if (selectedTimePeriod == "this-week"){
            selectedTimePeriodElem.style.width = "170px";
            // Calculate the number of items to take (minimum of 7 or the object's length)
            itemsToTake = Math.min(7, list.length);
        }
        else if (selectedTimePeriod == "this-month"){
            selectedTimePeriodElem.style.width = "190px";
            itemsToTake = Math.min(30, list.length);
        }
        else if (selectedTimePeriod == "3-months"){
            selectedTimePeriodElem.style.width = "200px";
            itemsToTake = Math.min(90, list.length);
        }
        else if (selectedTimePeriod == "6-months"){
            selectedTimePeriodElem.style.width = "205px";
            itemsToTake = Math.min(180, list.length);
        }
        else if (selectedTimePeriod == "this-year"){
            selectedTimePeriodElem.style.width = "160px";
            itemsToTake = Math.min(365, list.length);
        }
        
        // Select the last itemsToTake items from the array
        const selectedItems = list.slice(-itemsToTake);
        // Convert the selected items back into an object
        // const selectedObject = Object.fromEntries(selectedItems);
        currentBalance = convertK(selectedItems.slice(-1)[0].split(',')[1]);
        previousBalance = convertK(selectedItems.slice(0)[0].split(',')[1]);
        var seperated = getSeperated(selectedItems);
        var stdBalance = standardizeToZeroOne(seperated[0]);
        var stdNifty = standardizeToZeroOne(seperated[1]);
        console.log(stdBalance)
        console.log(stdNifty)
        // Handle the list here
        const percentChange = ((currentBalance - previousBalance) / previousBalance * 100).toFixed(2);
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
        const sumValue = calculateSumValue(currentBalance, previousBalance); // Replace with your logic to calculate the sum value
        sumValueElement.textContent = sumValue; // Set the sum value text

        getChartData(stdBalance, stdNifty, seperated[2]);
        
      })
      .catch(error => {
        // Handle errors here
        console.error('Error:', error);
      });
    // Replace these values with actual data from your source
    const currentPrice = 100; // Replace with the current price
    const previousPrice = 97.7; // Replace with the previous price

    fetch('openPosition.json')
      .then(response => response.json())
      .then(data => {
        // 'data' will contain the loaded array
        updateOpenPositions(data);
                
      })
      .catch(error => {
        console.error('Error loading data:', error);
      });

}

function standardizeToZeroOne(data) {
  const min = Math.min(...data);
  const max = Math.max(...data);

  return data.map(value => (value - min) / (max - min));
}

function getSeperated(list){
    var balance = [];
    var nifty = [];
    var date = [];
    for (const item of list){
        i = item.split(',');
        balance.push(convertK(i[1]));
        nifty.push(i[2]);
        date.push(i[0])
    }
    return [balance, nifty, date]
}




// Add an event listener to the dropdown for updating the text when a new time period is selected
document.getElementById("time-period-select").addEventListener("change", updateDynamicText);

document.addEventListener("DOMContentLoaded", function() {
    // Call the function to update the text and chart when the DOM is ready
    updateDynamicText();
});


