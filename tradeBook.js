 // Function to filter JSON data by key and value
function filterData(data, symbolFilterValue) {
    filteredData = [];
    for(const item of data){
        if (item['Instrument'] == symbolFilterValue){
            filteredData.push(item);
        }
    }
    return filteredData;
}
function displayTable(filteredData){
    
}
function updateTable(symbolFilterValue) {
    fetch('tradebook.json')
      .then(response => response.json())
      .then(data => {
        // 'data' will contain the loaded array
        filteredData = filterData(data, symbolFilterValue);
        console.log(filteredData);
      })
      .catch(error => {
        console.error('Error loading data:', error);
      });
    
}

const submitBtn = document.querySelector('#submit-btn');
const symbolFilter = document.querySelector('#symbolFilter')
// Add a click event listener to the button
submitBtn.addEventListener('click', function() {
    const symbolFilterValue = symbolFilter.value
    updateTable(symbolFilterValue)
});


document.addEventListener("DOMContentLoaded", function() {
    // Call the function to update the text and chart when the DOM is ready
    updateTable();
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