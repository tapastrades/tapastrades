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