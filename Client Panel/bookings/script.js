// Sample booking data
const bookingDetailsData = {
    booking1: {
        id: '001234',
        vehicle: 'Honda City',
        pickupDate: '2024-11-10',
        returnDate: '2024-11-15',
        status: 'Upcoming'
    }
};

// Function to display booking details
function viewBookingDetails(bookingId) {
    const booking = bookingDetailsData[bookingId];
    alert(`Booking Details:
    ID: ${booking.id}
    Vehicle: ${booking.vehicle}
    Pickup: ${booking.pickupDate}
    Return: ${booking.returnDate}
    Status: ${booking.status}`);
}

// Function to open feedback modal
function openFeedbackForm() {
    document.getElementById('feedbackModal').style.display = 'flex';
}

// Function to close feedback modal
function closeFeedbackModal() {
    document.getElementById('feedbackModal').style.display = 'none';
}

// Function to handle feedback rating
function rate(stars) {
    const ratingStars = document.getElementById('ratingStars').children;
    for (let i = 0; i < ratingStars.length; i++) {
        ratingStars[i].classList.toggle('active', i < stars);
    }
}

// Function to submit feedback
function submitFeedback() {
    const feedbackText = document.getElementById('feedbackText').value;
    if (feedbackText.trim() === "") {
        alert("Please write some feedback before submitting.");
    } else {
        alert("Thank you for your feedback!");
        closeFeedbackModal();
    }
}

// Placeholder functions for modify and cancel actions
function modifyBooking() {
    alert("Modify booking feature is coming soon!");
}

function cancelBooking() {
    alert("Booking cancelled successfully.");
}

// Function to apply filters (for demo purposes)
function applyFilters() {
    alert("Filters applied!");
}



// Show scroll-to-top button when scrolling down
window.onscroll = function () {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Scroll to top function when the button is clicked
document.getElementById('scrollToTop').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
