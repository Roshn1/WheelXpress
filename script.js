// Get the button and popup elements
const goaBtn = document.getElementById('goaBtn');
const cityPopup = document.getElementById('cityPopup');
const closeBtn = document.querySelector('.close-btn');

// Show the popup when the button is clicked
goaBtn.addEventListener('click', () => {
  cityPopup.style.display = 'flex';
});

// Hide the popup when the close button is clicked
closeBtn.addEventListener('click', () => {
  cityPopup.style.display = 'none';
});

// Hide the popup when clicking outside the content area
window.addEventListener('click', (event) => {
  if (event.target == cityPopup) {
    cityPopup.style.display = 'none';
  }
});
