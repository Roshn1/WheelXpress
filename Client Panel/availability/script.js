// // JavaScript for Vehicle Availability - WheelXpress

// // Toggle navbar for mobile view
// document.getElementById("navbarToggle").addEventListener("click", function() {
//     const navbarMenu = document.getElementById("navbarMenu");
//     navbarMenu.classList.toggle("active");
// });

// // Initial vehicles data
// const vehicles = [
//     {
//         name: "TVS Apache RTR 160 BS6",
//         transmission: "manual",
//         fuel: "petrol",
//         city: "Mumbai",
//         price: 750,
//         popularity: 2,
//     },
//     {
//         name: "Royal Enfield Bullet Standard 500",
//         transmission: "manual",
//         fuel: "petrol",
//         city: "Mumbai",
//         price: 1100,
//         popularity: 3,
//     },
//     {
//         name: "Bajaj Pulsar 200 NS",
//         transmission: "manual",
//         fuel: "petrol",
//         city: "Mumbai",
//         price: 600,
//         popularity: 4,
//     },
//     // Add more vehicle data as needed
// ];

// // Display vehicles function
// function displayVehicles(filteredVehicles) {
//     const vehicleContainer = document.querySelector(".availability-grid");
//     vehicleContainer.innerHTML = ""; // Clear previous content

//     filteredVehicles.forEach((vehicle) => {
//         const vehicleCard = `
//             <div class="vehicle-card">
//                 <img src="/photos/${vehicle.name}.jpg" alt="Vehicle Image" class="vehicle-image">
//                 <div class="vehicle-info">
//                     <h2 class="vehicle-name">${vehicle.name}</h2>
//                     <p class="vehicle-details">${vehicle.transmission} | ${vehicle.fuel} | 2 Seater</p>
//                     <p class="vehicle-location">Available in ${vehicle.city}</p>
//                     <p class="price">₹${vehicle.price} / Day</p>
//                     <p class="availability-status">Available Now</p>
//                     <button class="book-now-btn">Book Now</button>
//                 </div>
//             </div>
//         `;
//         vehicleContainer.innerHTML += vehicleCard;
//     });
// }

// // Initial display of all vehicles
// displayVehicles(vehicles);

// // Filter and sort functionality
// function filterAndSortVehicles() {
//     const vehicleType = document.getElementById("vehicleType").value;
//     const transmissionType = document.getElementById("transmissionType").value;
//     const fuelType = document.getElementById("fuelType").value;
//     const cityType = document.getElementById("cityType").value;
//     const sortBy = document.getElementById("sortBy").value;

//     let filteredVehicles = vehicles;

//     // Filter by vehicle type
//     if (vehicleType !== "all") {
//         filteredVehicles = filteredVehicles.filter(vehicle => vehicle.name.toLowerCase().includes(vehicleType));
//     }

//     // Filter by transmission type
//     if (transmissionType !== "any") {
//         filteredVehicles = filteredVehicles.filter(vehicle => vehicle.transmission === transmissionType);
//     }

//     // Filter by fuel type
//     if (fuelType !== "any") {
//         filteredVehicles = filteredVehicles.filter(vehicle => vehicle.fuel === fuelType);
//     }

//     // Filter by city
//     if (cityType !== "any") {
//         filteredVehicles = filteredVehicles.filter(vehicle => vehicle.city === cityType);
//     }

//     // Sorting
//     if (sortBy === "priceLowHigh") {
//         filteredVehicles.sort((a, b) => a.price - b.price);
//     } else if (sortBy === "priceHighLow") {
//         filteredVehicles.sort((a, b) => b.price - a.price);
//     } else if (sortBy === "popularity") {
//         filteredVehicles.sort((a, b) => b.popularity - a.popularity);
//     }

//     // Display the filtered and sorted vehicles
//     displayVehicles(filteredVehicles);
// }

// // Event listeners for filter and sort options
// document.getElementById("vehicleType").addEventListener("change", filterAndSortVehicles);
// document.getElementById("transmissionType").addEventListener("change", filterAndSortVehicles);
// document.getElementById("fuelType").addEventListener("change", filterAndSortVehicles);
// document.getElementById("cityType").addEventListener("change", filterAndSortVehicles);
// document.getElementById("sortBy").addEventListener("change", filterAndSortVehicles);








// Selecting filter dropdowns and the grid container
const vehicleTypeDropdown = document.getElementById("vehicleType");
const transmissionTypeDropdown = document.getElementById("transmissionType");
const fuelTypeDropdown = document.getElementById("fuelType");
const cityTypeDropdown = document.getElementById("cityType");
const sortByDropdown = document.getElementById("sortBy");
const vehicleCards = document.querySelectorAll(".vehicle-card");

// Function to filter vehicle cards based on dropdown selections
function filterVehicles() {
    const vehicleType = vehicleTypeDropdown.value;
    const transmissionType = transmissionTypeDropdown.value;
    const fuelType = fuelTypeDropdown.value;
    const cityType = cityTypeDropdown.value.trim().toLowerCase();

    vehicleCards.forEach(card => {
        // Get relevant attributes of each vehicle card
        const vehicleDetails = card.querySelector(".vehicle-details").textContent.toLowerCase();
        const vehicleLocation = card.querySelector(".vehicle-location").textContent.toLowerCase();

        // Check if the card matches all selected filters
        const matchesType = vehicleType === "all" || vehicleDetails.includes(vehicleType);
        const matchesTransmission = transmissionType === "any" || vehicleDetails.includes(transmissionType);
        const matchesFuel = fuelType === "any" || vehicleDetails.includes(fuelType);
        const matchesCity = cityType === "any" || vehicleLocation.includes(cityType);

        // Show or hide the card based on matching filters
        if (matchesType && matchesTransmission && matchesFuel && matchesCity) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Function to sort vehicle cards by selected criteria
function sortVehicles() {
    const sortBy = sortByDropdown.value;
    const container = document.querySelector(".availability-grid");

    // Convert NodeList to array for sorting
    const sortedCards = Array.from(vehicleCards).sort((a, b) => {
        const priceA = parseInt(a.querySelector(".price").textContent.replace(/[^0-9]/g, ""));
        const priceB = parseInt(b.querySelector(".price").textContent.replace(/[^0-9]/g, ""));

        if (sortBy === "priceLowHigh") {
            return priceA - priceB;
        } else if (sortBy === "priceHighLow") {
            return priceB - priceA;
        }
        return 0; // Keep order the same for 'popularity'
    });

    // Clear container and re-append sorted cards
    container.innerHTML = "";
    sortedCards.forEach(card => container.appendChild(card));
}

// Event listeners for filtering and sorting
vehicleTypeDropdown.addEventListener("change", filterVehicles);
transmissionTypeDropdown.addEventListener("change", filterVehicles);
fuelTypeDropdown.addEventListener("change", filterVehicles);
cityTypeDropdown.addEventListener("change", filterVehicles);
sortByDropdown.addEventListener("change", sortVehicles);



// Get selected city from dropdown
const citySelect = document.getElementById("cityDropdown");

citySelect.addEventListener("change", function() {
    const selectedCity = citySelect.value;

    // Filter bikes by selected city
    fetch(`/api/bikes?city=${selectedCity}`)
        .then(response => response.json())
        .then(bikes => {
            displayBikes(bikes); // Update the UI to show only bikes from the selected city
        })
        .catch(error => console.error("Error fetching bikes:", error));
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
