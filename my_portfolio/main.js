var typed = new Typed(".text",{
    strings:["Frontend Developer","Web Developer"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
})
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form values
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const subject = form.querySelector('input[type="text"]').value;
        const message = form.querySelector('textarea').value;

        // You can perform validation here if needed

        // Create an object with the form data
        const formData = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        // Send the form data to your server using fetch or XMLHttpRequest
        // Replace 'your-server-endpoint' with the actual endpoint URL
        fetch('your-server-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                // If the request was successful, reset the form
                form.reset();
                alert('Your message has been sent successfully!');
            } else {
                // If there was an error with the request, show an error message
                alert('Failed to send message. Please try again later.');
            }
        })
        .catch(error => {
            // If there was a network error, show an error message
            alert('Failed to send message. Please check your internet connection and try again.');
        });
    });
});
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.navbar').classList.toggle('active');
});