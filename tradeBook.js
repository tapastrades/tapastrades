 // Function to filter JSON data by key and value
function filterData(data, symbolFilterValue) {
    filteredData = [];
    for(const item of data){
        if (item['Instrument'] == symbolFilterValue){
            // console.log(item)
            filteredData.push(item);
        }
    }
    return filteredData;
}
function displayTable(filteredData, tradebookTable){
    // Remove all rows
    while (tradebookTable.rows.length > 0) {
        tradebookTable.deleteRow(0); // Delete the first row repeatedly until there are no more rows left.
    }
    // console.log(filteredData)
    for(const data in filteredData){
        value = filteredData[data];
        var row = tradebookTable.insertRow();
        var symbolCell = row.insertCell(0);
        var tradeIdCell = row.insertCell(1);
        var entryCell = row.insertCell(2);
        var exitCell = row.insertCell(3);
        var positionCell = row.insertCell(4)
        var entryTimeCell = row.insertCell(5);
        var exitTimeCell = row.insertCell(6);

        symbolCell.textContent = value['Instrument'];
        tradeIdCell.textContent = value['ID'];
        entryCell.textContent = value['Entry'];
        exitCell.textContent = value['Exit'];
        positionCell.textContent = value['Position'];
        entryTimeCell.textContent = value['Entry Time'];
        exitTimeCell.textContent = value['Exit Time'];
    }
}
function updateTable(symbolFilterValue, tradebookTable) {
    fetch('tradebook.json')
      .then(response => response.json())
      .then(data => {
        // 'data' will contain the loaded array
        filteredData = filterData(data, symbolFilterValue);
        displayTable(filteredData, tradebookTable);
        console.log(filteredData);
      })
      .catch(error => {
        console.error('Error loading data:', error);
      });
    
}

var tradebookTable = document.querySelector('.tradebook-table').getElementsByTagName('tbody')[0];
const submitBtn = document.querySelector('#submit-btn');
const symbolFilter = document.querySelector('#symbolFilter')
const dateFilter = document.querySelector('#dateFilter');
var symbolFilterValue = symbolFilter.value;
var dateFilterValue = dateFilter.value;
console.log(dateFilterValue);
// var dateFilterStart = dateFilterValue.split('-')[0].trim();
// var dateFilterEnd = dateFilterValue.split('-')[1].trim();

// const 
// Add a click event listener to the button
submitBtn.addEventListener('click', function() {
    var tradebookTable = document.querySelector('.tradebook-table').getElementsByTagName('tbody')[0];
    var symbolFilterValue = symbolFilter.value;
    var dateFilterValue = dateFilter.value;
        
    var dateFilterStart = dateFilterValue.split('-')[0].trim();
    var dateFilterEnd = dateFilterValue.split('-')[1].trim();    
    
    updateTable(symbolFilterValue, tradebookTable)
});


document.addEventListener("DOMContentLoaded", function() {
    // Call the function to update the text and chart when the DOM is ready
    var tradebookTable = document.querySelector('.tradebook-table').getElementsByTagName('tbody')[0];
    
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