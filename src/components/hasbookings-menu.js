

// Skip all of this if we're already on the 'Bookings' Page.
const currentPath = window.location.pathname
//console.log(currentPath)
const pathArray = window.location.pathname.split('/').filter(segment => segment !== "")   // removes empty strings from array
console.log('pathArray', pathArray); // Outputs an array of path segments
if (pathArray[0] !== 'bookings') {
  //console.log("Not on Bookings Page, so show the button in footer")


  // Vanilla JS to show the "View Bookings" button in the footer, if there's a localStorage item.
  const hasBookings = localStorage.completedBookingsList ? JSON.parse(localStorage.completedBookingsList) : []
  console.log("hasBookings", hasBookings)

  // If we have a booking, then show the button.
  const bookingsButton = document.querySelector("#viewBookings");
  const bookingsBtnTxt = document.querySelector("#viewBookingsTxt");

  const bookingsCount = hasBookings.length

  if ( bookingsCount > 0) {
    if (bookingsCount === 1) {
      bookingsBtnTxt.innerHTML = "View your Booking..."
    }
    if (bookingsCount > 1) {
      bookingsBtnTxt.innerHTML = "View your Bookings..."
    }
    // Show the button.
    setTimeout(() => {
      bookingsButton.classList.remove('opacity-0');
      bookingsButton.classList.add('opacity-100');  
    }, 1500); // Delay before fading in
  }


}