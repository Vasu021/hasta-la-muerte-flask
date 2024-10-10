// Show modal on button click
document.getElementById('proposeButton').addEventListener('click', function() {
    // Show the modal instead of the alert
    document.getElementById('userMessage').value = "";
    $('#responseModal').modal('show');
});

function formatDateTime(date) {
    const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with leading zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-based) and pad
    const year = date.getFullYear(); // Get the full year
    const hours = String(date.getHours()).padStart(2, '0'); // Get the hours and pad
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Get the minutes and pad
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Get the seconds and pad

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`; // Format as desired
}

// Handle the response when "Yes" is clicked
document.getElementById('confirmResponse').addEventListener('click', function() {
    // Get the user message
    var userMessage = document.getElementById('userMessage').value;
    var now = new Date();
    var dateAndTime = formatDateTime(now); //get date and timein string

    //console.log("User Message:", userMessage); // This logs the message to the console
    
    // Make a POST request to the server
    var object = {
        'userMessage' : userMessage,
        'dateAndTime' : dateAndTime
    };
    var xhr = new XMLHttpRequest();
        xhr.open('POST', '/saveMessage', true);
        xhr.setRequestHeader('Content-Type', 'application/json');  // Set the content type to JSON
        xhr.send(JSON.stringify(object));
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {  // Check if the request was successful
                    newAlert("Success!!!", "Your message was saved successfully.", "success");
                } else {
                    // Handle different HTTP status codes
                    let errorMessage = "Something went wrong.";
                    if (xhr.status === 400) {
                        errorMessage = "Bad Request: " + xhr.responseText; // Handle 400 Bad Request
                    } else if (xhr.status === 500) {
                        errorMessage = "Internal Server Error: " + xhr.responseText; // Handle 500 Internal Server Error
                    }
                    newAlert(errorMessage, "Error", "error");
                    console.log(errorMessage);
                }
            }
        };
        

    // Show the response saved text
    document.getElementById('responseSavedText').style.display = 'block';
    // Hide the modal
    $('#responseModal').modal('hide');
});