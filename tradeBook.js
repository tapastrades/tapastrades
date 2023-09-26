 // Function to filter JSON data by key and value
function filterData(data, symbolFilterValue) {
    filteredData = [];
    console.log(symbolFilterValue)
    for(const item of data){
        if (item['Instrument'] == symbolFilterValue){
            filteredData.push(item);
        }
    }
    return filteredData;
}
function displayTable(filteredData){
    for(const data in filterData){
        var row = tradebookTable.insertRow();
        var symbolCell = row.insertCell(0);
        var tradeIdCell = row.insertCell(1);
        var entryCell = row.insertCell(2);
        var exitCell = row.insertCell(3);
        var positionCell = row.insertCell(4)
        var entryTimeCell = row.insertCell(5);
        var exitTimeCell = row.insertCell(6);

        symbolCell.textContent = filteredData['Instrument'];
        tradeIdCell.textContent = filteredData['ID'];
        entryCell.textContent = filteredData['Entry'];
        exitCell.textContent = filteredData['Exit'];
        positionCell.textContent = filteredData['Position'];
        entryTimeCell.textContent = filteredData['Entry Time'];
        exitTimeCell.textContent =filteredData['Exit Time'];
    }
}
function updateTable(symbolFilterValue) {
    fetch('tradebook.json')
      .then(response => response.json())
      .then(data => {
        // 'data' will contain the loaded array
        filteredData = filterData(data, symbolFilterValue);
        displayTable(filteredData);
        console.log(filteredData);
      })
      .catch(error => {
        console.error('Error loading data:', error);
      });
    
}

var tradebookTable = document.querySelector('.tradebook-table').getElementsByTagName('tbody')[0];
const submitBtn = document.querySelector('#submit-btn');
const symbolFilter = document.querySelector('#symbolFilter')
const symbolFilterValue = symbolFilter.value;
// Add a click event listener to the button
submitBtn.addEventListener('click', function() {
    
    updateTable(symbolFilterValue, tradebookTable)
});


document.addEventListener("DOMContentLoaded", function() {
    // Call the function to update the text and chart when the DOM is ready
    updateTable(symbolFilterValue, tradebookTable);
    console.log('Activted')
});

// Add an event listener for the "resize" event
window.addEventListener('resize', function(){
    // Reload the page when the window is resized
    window.location.reload();
});


const sidebarButton = document.querySelector('.sidebar-button');
const sidebar = document.querySelector('.sidebar');

// Function to toggle the sidebar's display property
function toggleSidebarDisplay() {
    if (sidebar.style.display === 'flex') {
        sidebar.style.display = 'none'; // Hide the sidebar
    } else {
        sidebar.style.display = 'flex'; // Show the sidebar
    }
}
// Add a click event listener to the button
sidebarButton.addEventListener('click', toggleSidebarDisplay);