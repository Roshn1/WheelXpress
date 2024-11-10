document.addEventListener("DOMContentLoaded", function () {
    // Initialize the map
    const map = L.map('map').setView([20.5937, 78.9629], 5); // Set initial view to India

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Sample data for rental locations
    const locations = [
        { id: 1, name: "Rental Station 1", lat: 28.6139, lng: 77.2090, availableVehicles: 5, rates: "$10/hour", hours: "9 AM - 9 PM" },
        { id: 2, name: "Rental Station 2", lat: 19.0760, lng: 72.8777, availableVehicles: 3, rates: "$15/hour", hours: "10 AM - 8 PM" },
        { id: 3, name: "Rental Station 3", lat: 13.0827, lng: 80.2707, availableVehicles: 7, rates: "$12/hour", hours: "8 AM - 10 PM" }
    ];

    const markers = [];
    // Adding markers to the map
    locations.forEach(location => {
        const marker = L.marker([location.lat, location.lng]).addTo(map);
        marker.bindPopup(`
            <div class="marker-popup">
                <h4>${location.name}</h4>
                <p>Available Vehicles: ${location.availableVehicles}</p>
                <p>Rates: ${location.rates}</p>
                <p>Rental Hours: ${location.hours}</p>
            </div>
        `);
        markers.push(marker);
    });

    // Display location list
    const locationList = document.getElementById('locationList');
    locationList.innerHTML = '<h3>Rental Stations</h3>';
    locations.forEach(location => {
        const item = document.createElement('div');
        item.className = 'location-item';
        item.innerHTML = location.name;
        item.onclick = () => {
            map.setView([location.lat, location.lng], 13);
            markers[location.id - 1].openPopup(); // Open corresponding marker popup
        };
        locationList.appendChild(item);
    });

    // Add animation on marker hover
    markers.forEach(marker => {
        marker.on('mouseover', function () {
            this.openPopup();
        });
        marker.on('mouseout', function () {
            this.closePopup();
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const items = locationList.getElementsByClassName('location-item');
        Array.from(items).forEach(item => {
            const isMatch = item.innerText.toLowerCase().includes(searchTerm);
            item.style.display = isMatch ? 'block' : 'none';
        });
    });
});



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
