const googleSheet = "https://script.google.com/macros/s/AKfycbzFpiUmbfT6QqHHOyeqvp0Z2DWda9ttzLve60NW2bNDabL4hJmuyYg5sYRjTZeQmbZHmg/exec";
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('msg');
const spinner = document.getElementById('spinner');  // The spinner element

function openmenu() {
    document.getElementById('sidemenu').style.width = '250px';
}

function closemenu() {
    document.getElementById('sidemenu').style.width = '0';
}

function opentab(tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-contents");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}

form.addEventListener('submit', submitForm);

function submitForm(event) {
    event.preventDefault();  // Prevent the form from submitting the default way

    // Show the spinner when form is being submitted
    spinner.style.display = 'block';
    msg.innerHTML = '';  // Clear previous message

    // Collect form data
    const formData = new FormData(form);

    // Send the form data to the Google Apps Script URL
    fetch(googleSheet, {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        // Hide the spinner and display success message
        spinner.style.display = 'none';
        msg.innerHTML = "Form submitted successfully!";
        form.reset();  // Reset the form after submission

        // Set timeout to clear message after 5 seconds
        setTimeout(() => {
            msg.innerHTML = '';  // Clear message after 5 seconds
        }, 5000);
    })
    .catch(error => {
        // Hide the spinner and display error message
        spinner.style.display = 'none';
        msg.innerHTML = "Error submitting form. Please try again.";

        // Set timeout to clear message after 5 seconds
        setTimeout(() => {
            msg.innerHTML = '';  // Clear message after 5 seconds
        }, 5000);
    });
}
