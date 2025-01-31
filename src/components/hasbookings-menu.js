

// Vanilla JS to show the "View Bookings" button in the footer, if there's a localStorage item.
const hasBookings = localStorage.completedBookingsList ? JSON.parse(localStorage.completedBookingsList) : []
console.log("hasBookings", hasBookings)

// If we have a booking, then show the button.
const bookingsButton = document.querySelector("#viewBookings");
const bookingsBtnLink = document.querySelector("#viewBookingsLink");

const bookingsCount = hasBookings.length

if ( bookingsCount > 0) {
  if (bookingsCount === 1) {
    bookingsBtnLink.innerHTML = "View your Booking..."
  }
  if (bookingsCount > 1) {
    bookingsBtnLink.innerHTML = "View your Bookings..."
  }
  // Show the button.
  setTimeout(() => {
    bookingsButton.classList.remove('opacity-0');
    bookingsButton.classList.add('opacity-100');
}, 1500); // Delay before fading in
}

