 // Function to filter JSON data by key and value
function filterData(data, symbolFilterValue, dateFilterStart, dateFilterEnd) {
    filteredData = [];

    for(const item of data){

        if (item['Instrument'] == symbolFilterValue.toLowerCase()){
            filteredData.push(item);
        }
        else if (symbolFilterValue === ''){
            filteredData.push(item);
        }
    }
    dayfilteredData = []
    var startDate = new Date(dateFilterStart).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    var endDate = new Date(dateFilterEnd).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    
    // console.log(startDate, entryDate);
    for (const item in filteredData) {
        value = filteredData[item];
        var entryDate = new Date(value['Entry Time']).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        
        if (dateFilterStart == undefined || dateFilterEnd == undefined) {
            dayfilteredData.push(value);
        }    
        else if (entryDate >= startDate && entryDate <= endDate) {
            dayfilteredData.push(value);
            
        }
        // startDate == endDate);

    }
    console.log(dayfilteredData)
    return dayfilteredData;
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
function updateTable(symbolFilterValue, dateFilterStart, dateFilterEnd, tradebookTable) {
    fetch('tradebook.json')
      .then(response => response.json())
      .then(data => {
        // 'data' will contain the loaded array
        filteredData = filterData(data, symbolFilterValue, dateFilterStart, dateFilterEnd);
        displayTable(filteredData, tradebookTable);
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
if (dateFilterValue.type == undefined){
    var dateFilterStart = undefined
    var dateFilterEnd = undefined    
}else {
    
    var dateFilterStart = dateFilterValue.split('-')[0].trim();
    var dateFilterEnd = dateFilterValue.split('-')[1].trim();

}

// Add an event listener for the Enter key press
symbolFilter.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        // Trigger a click event on the submit button
        submitBtn.click();
    }
});

// Add an event listener for the Enter key press
dateFilter.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        // Trigger a click event on the submit button
        submitBtn.click();
    }
});

// const 
// Add a click event listener to the button
submitBtn.addEventListener('click', function() {
    var tradebookTable = document.querySelector('.tradebook-table').getElementsByTagName('tbody')[0];
    var symbolFilterValue = symbolFilter.value;
    var dateFilterValue = dateFilter.value;
    
    dateFilterStart = dateFilterValue.split('-')[0].trim();
    dateFilterEnd = dateFilterValue.split('-')[1].trim();    
    
    updateTable(symbolFilterValue, dateFilterStart, dateFilterEnd, tradebookTable)
});


document.addEventListener("DOMContentLoaded", function() {
    // Call the function to update the text and chart when the DOM is ready
    tradebookTable = document.querySelector('.tradebook-table').getElementsByTagName('tbody')[0];
    // console.log(tradebookTable);
    updateTable(symbolFilterValue, dateFilterStart, dateFilterEnd, tradebookTable);
    // console.log('Activted')
});

// Add an event listener for the "resize" event
window.addEventListener('resize', function(){
    // Reload the page when the window is resized
    // window.location.reload();
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