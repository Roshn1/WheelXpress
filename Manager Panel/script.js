const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const submenus = document.querySelectorAll(".submenu");

hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

submenus.forEach((menu) => {
    menu.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Rentals Chart
    const ctxRentals = document.getElementById("rentalsChart").getContext("2d");
    const rentalsChart = new Chart(ctxRentals, {
        type: "bar",
        data: {
            labels: ["January", "February", "March", "April", "May"],
            datasets: [
                {
                    label: "Number of Rentals",
                    data: [50, 60, 55, 70, 90],
                    backgroundColor: "rgba(54, 162, 235, 0.5)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    // Revenue Chart
    const ctxRevenue = document.getElementById("revenueChart").getContext("2d");
    const revenueChart = new Chart(ctxRevenue, {
        type: "line",
        data: {
            labels: ["January", "February", "March", "April", "May"],
            datasets: [
                {
                    label: "Revenue in $",
                    data: [5000, 6000, 5500, 7000, 9000],
                    backgroundColor: "rgba(255, 206, 86, 0.2)",
                    borderColor: "rgba(255, 206, 86, 1)",
                    borderWidth: 2,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
});

document.querySelectorAll(".percentage-circle").forEach((circle, index) => {
    const percentageValues = [80, 90, 70]; // Adjust the values dynamically if required
    circle.innerText = percentageValues[index] + "%";
});

// Show/Hide Add Bike Section
const showAddBikeBtn = document.getElementById("showAddBikeBtn");
const addBikeSection = document.getElementById("addBikeSection");

showAddBikeBtn.addEventListener("click", function () {
    if (addBikeSection.style.display === "none") {
        addBikeSection.style.display = "block";
    } else {
        addBikeSection.style.display = "none";
    }
});

// JavaScript to handle adding, removing, and editing vehicle stock
// document.querySelector('.add-bike-form').addEventListener('submit', function (e) {
//     e.preventDefault();
//     const vehicleName = document.getElementById('vehicleName').value;
//     const vehicleType = document.getElementById('vehicleType').value;
//     const vehicleStock = document.getElementById('vehicleStock').value;
//     const vehicleImage = document.getElementById('vehicleImage').files[0];

//     const reader = new FileReader();
//     reader.onload = function (e) {
//         document.getElementById('vehicleImagePreview').src = e.target.result;
//     }

//     if (vehicleImage) {
//         reader.readAsDataURL(vehicleImage);
//     }

//     document.getElementById('vehicleDetails').innerText = `Name: ${vehicleName}, Type: ${vehicleType}, Stock: ${vehicleStock}`;
// });

// // You can add functions to handle removing and editing the stock here
// document.querySelector('.remove-btn').addEventListener('click', function () {
//     alert('Remove vehicle functionality can be added here!');
// });

// document.querySelector('.edit-btn').addEventListener('click', function () {
//     alert('Edit stock functionality can be added here!');
// });

let editingRow = null; // Track the row being edited

function showTab(tabName) {
    const tabs = document.querySelectorAll(".tab-content");
    const buttons = document.querySelectorAll(".tab-button");

    tabs.forEach((tab) => {
        tab.classList.remove("active");
    });

    buttons.forEach((button) => {
        button.classList.remove("active");
    });

    document.getElementById(tabName).classList.add("active");
    event.target.classList.add("active");
}

// Preview image and information when the image is uploaded
document
    .getElementById("bikeImage")
    .addEventListener("change", function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("previewImage").src = e.target.result;
            document.getElementById("previewType").innerText =
                document.getElementById("vehicleType").value;
            document.getElementById("previewName").innerText =
                document.getElementById("bikeName").value;
            document.getElementById("previewPrice").innerText =
                document.getElementById("bikePrice").value;
            document.getElementById("previewSeater").innerText =
                document.getElementById("seater").value;
            document.getElementById("previewTransmission").innerText =
                document.getElementById("transmission").value;
            document.getElementById("previewFuel").innerText =
                document.getElementById("fuel").value;
            document.getElementById("previewStock").innerText =
                document.getElementById("stock").value;
            document.getElementById("preview").style.display = "block";
        };
        reader.readAsDataURL(file);
    });

document
    .getElementById("addBikeForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const vehicleType = document.getElementById("vehicleType").value;
        const bikeName = document.getElementById("bikeName").value;
        const bikeImage = document.getElementById("bikeImage").files[0];
        const bikePrice = document.getElementById("bikePrice").value;
        const seater = document.getElementById("seater").value;
        const transmission = document.getElementById("transmission").value;
        const fuel = document.getElementById("fuel").value;
        const stock = document.getElementById("stock").value;

        const bikeTable = document
            .getElementById("bikeTable")
            .getElementsByTagName("tbody")[0];
        const newRow = bikeTable.insertRow();

        const imageUrl = URL.createObjectURL(bikeImage); // Create a URL for the uploaded image

        newRow.innerHTML = `
        <td>${vehicleType}</td>
        <td>${bikeName}</td>
        <td><img src="${imageUrl}" alt="${bikeName}" width="100"></td>
        <td>${bikePrice}</td>
        <td>${seater}</td>
        <td>${transmission}</td>
        <td>${fuel}</td>
        <td>${stock}</td>
        <td>
            <button onclick="editBike(this)">Edit</button>
            <button onclick="removeBike(this)">Remove</button>
        </td>
    `;

        this.reset(); // Clear the form
        document.getElementById("preview").style.display = "none"; // Hide the preview
    });

// Remove bike function
function removeBike(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// Edit bike function
function editBike(button) {
    const row = button.parentNode.parentNode;

    // Get current row data
    const vehicleType = row.cells[0].innerText;
    const bikeName = row.cells[1].innerText;
    const bikeImageSrc = row.cells[2].querySelector("img").src; // Get the current image source
    const bikePrice = row.cells[3].innerText;
    const seater = row.cells[4].innerText;
    const transmission = row.cells[5].innerText;
    const fuel = row.cells[6].innerText;
    const stock = row.cells[7].innerText;

    // Fill the form with current values
    document.getElementById("vehicleType").value = vehicleType;
    document.getElementById("bikeName").value = bikeName;
    document.getElementById("bikePrice").value = bikePrice;
    document.getElementById("seater").value = seater;
    document.getElementById("transmission").value = transmission;
    document.getElementById("fuel").value = fuel;
    document.getElementById("stock").value = stock;

    // Set the image preview
    const previewImage = document.getElementById("previewImage");
    previewImage.src = bikeImageSrc;

    // Show the preview
    document.getElementById("preview").style.display = "block";

    // Set the editing row
    editingRow = row; // Store the row for editing
}

// Update the row after editing
document
    .getElementById("addBikeForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        if (editingRow) {
            // If editing a row
            const vehicleType = document.getElementById("vehicleType").value;
            const bikeName = document.getElementById("bikeName").value;
            const bikeImage = document.getElementById("bikeImage").files[0];
            const bikePrice = document.getElementById("bikePrice").value;
            const seater = document.getElementById("seater").value;
            const transmission = document.getElementById("transmission").value;
            const fuel = document.getElementById("fuel").value;
            const stock = document.getElementById("stock").value;

            const imageUrl = bikeImage
                ? URL.createObjectURL(bikeImage)
                : editingRow.cells[2].querySelector("img").src;

            // Update the row data
            editingRow.innerHTML = `
            <td>${vehicleType}</td>
            <td>${bikeName}</td>
            <td><img src="${imageUrl}" alt="${bikeName}" width="100"></td>
            <td>${bikePrice}</td>
            <td>${seater}</td>
            <td>${transmission}</td>
            <td>${fuel}</td>
            <td>${stock}</td>
            <td>
                <button onclick="editBike(this)">Edit</button>
                <button onclick="removeBike(this)">Remove</button>
            </td>
        `;

            this.reset(); // Clear the form
            document.getElementById("preview").style.display = "none"; // Hide the preview
            editingRow = null; // Reset editing row
        } else {
            // Normal addition of a new bike (similar code as above)
            const vehicleType = document.getElementById("vehicleType").value;
            const bikeName = document.getElementById("bikeName").value;
            const bikeImage = document.getElementById("bikeImage").files[0];
            const bikePrice = document.getElementById("bikePrice").value;
            const seater = document.getElementById("seater").value;
            const transmission = document.getElementById("transmission").value;
            const fuel = document.getElementById("fuel").value;
            const stock = document.getElementById("stock").value;

            const bikeTable = document
                .getElementById("bikeTable")
                .getElementsByTagName("tbody")[0];
            const newRow = bikeTable.insertRow();

            const imageUrl = URL.createObjectURL(bikeImage); // Create a URL for the uploaded image

            newRow.innerHTML = `
            <td>${vehicleType}</td>
            <td>${bikeName}</td>
            <td><img src="${imageUrl}" alt="${bikeName}" width="100"></td>
            <td>${bikePrice}</td>
            <td>${seater}</td>
            <td>${transmission}</td>
            <td>${fuel}</td>
            <td>${stock}</td>
            <td>
                <button onclick="editBike(this)">Edit</button>
                <button onclick="removeBike(this)">Remove</button>
            </td>
        `;

            this.reset(); // Clear the form
            document.getElementById("preview").style.display = "none"; // Hide the preview
        }
    });

function generateReport() {
    const reportType = document.getElementById("reportType").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    if (!startDate || !endDate) {
        alert("Please select a date range.");
        return;
    }

    const reportOutput = document.getElementById("reportOutput");
    reportOutput.style.display = "block";

    // Clear any previous report content
    reportOutput.innerHTML = `<h3>${reportType} Report</h3>
                              <p>For dates: ${startDate} to ${endDate}</p>`;

    // Sample dynamic data based on report type
    if (reportType === "rentals") {
        reportOutput.innerHTML += `
            <table>
                <thead>
                    <tr>
                        <th>Vehicle Name</th>
                        <th>Rental Date</th>
                        <th>Rented By</th>
                        <th>Duration (days)</th>
                        <th>Total Cost</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Honda CB Shine</td>
                        <td>${startDate}</td>
                        <td>John Doe</td>
                        <td>3</td>
                        <td>$150</td>
                    </tr>
                    <tr>
                        <td>TVS Jupiter</td>
                        <td>${endDate}</td>
                        <td>Jane Smith</td>
                        <td>2</td>
                        <td>$100</td>
                    </tr>
                </tbody>
            </table>
        `;
    } else if (reportType === "revenue") {
        reportOutput.innerHTML += `
            <p><strong>Total Revenue:</strong> $2,500</p>
            <p><strong>Average Revenue per Rental:</strong> $125</p>
            <p><strong>Top Revenue Vehicle:</strong> Toyota Corolla ($1,500)</p>
        `;
    } else if (reportType === "vehicleUsage") {
        reportOutput.innerHTML += `
            <table>
                <thead>
                    <tr>
                        <th>Vehicle Name</th>
                        <th>Times Rented</th>
                        <th>Total Rental Duration (days)</th>
                        <th>Fuel Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Honda CB Shine</td>
                        <td>5</td>
                        <td>15</td>
                        <td>Petrol</td>
                    </tr>
                    <tr>
                        <td>TVS Jupiter</td>
                        <td>3</td>
                        <td>6</td>
                        <td>Petrol</td>
                    </tr>
                    <tr>
                        <td>Toyota Corolla</td>
                        <td>2</td>
                        <td>8</td>
                        <td>Petrol</td>
                    </tr>
                </tbody>
            </table>
        `;
    }
}

function downloadReportAsPDF() {
    const reportContent = document.getElementById("reportOutput").innerHTML;
    const pdfWindow = window.open("", "_blank");
    pdfWindow.document.write(
        `<html><head><title>Report</title></head><body>${reportContent}</body></html>`
    );
    pdfWindow.document.close();
    pdfWindow.print();
}

function exportReportAsCSV() {
    const reportType = document.getElementById("reportType").value;
    const csvData = [];

    // Add headers based on report type
    if (reportType === "rentals") {
        csvData.push([
            "Vehicle Name",
            "Rental Date",
            "Rented By",
            "Duration (days)",
            "Total Cost",
        ]);
        csvData.push(["Honda CB Shine", "2024-11-01", "John Doe", "3", "150"]);
        csvData.push(["TVS Jupiter", "2024-11-06", "Jane Smith", "2", "100"]);
    } else if (reportType === "revenue") {
        csvData.push([
            "Total Revenue",
            "Average Revenue per Rental",
            "Top Revenue Vehicle",
        ]);
        csvData.push(["2500", "125", "Toyota Corolla"]);
    } else if (reportType === "vehicleUsage") {
        csvData.push([
            "Vehicle Name",
            "Times Rented",
            "Total Rental Duration (days)",
            "Fuel Type",
        ]);
        csvData.push(["Honda CB Shine", "5", "15", "Petrol"]);
    }

    let csvContent =
        "data:text/csv;charset=utf-8," + csvData.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${reportType}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function setQuickDateRange(days) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    document.getElementById("startDate").value = startDate
        .toISOString()
        .split("T")[0];
    document.getElementById("endDate").value = endDate
        .toISOString()
        .split("T")[0];
}


window.onload = function () {
    // Bike Chart
    const bikeCtx = document.getElementById("bikeChart").getContext("2d");
    const bikeChart = new Chart(bikeCtx, {
        type: "bar",
        data: {
            labels: ["TVS Jupiter", "TVS Apache RTR 160 BS6", "Royal Enfield Bullet", "Bajaj Pulsar 200 NS", "Bajaj Avenger 220", "Bajaj Pulsar 220", "Honda Activa 5G", "Suzuki Access 125", "Royal Enfield Himalayan", "TVS Jupiter Classic", "Suzuki Intruder", "Honda CBR 250R"],
            datasets: [{
                label: "Times Rented",
                data: [10, 15, 8, 12, 5, 20, 13, 8, 3, 9, 11, 5],
                backgroundColor: ["#007bff", "#ff5733", "#28a745", "#ffc107", "#6610f2", "#17a2b8", "#dc3545", "#28a745", "#6c757d", "#c64e98", "#10eaf2", "#6610f2"],
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Bike Rentals" },
            },
        },
    });

    // Car Chart
    const carCtx = document.getElementById("carChart").getContext("2d");
    const carChart = new Chart(carCtx, {
        type: "bar",
        data: {
            labels: ["Maruti Ertiga", "Tata Safari", "Toyota Innova", "Hyundai i20", "KIA Sonet", "Maruti Dzire", "Toyota Glanza", "Toyota Innova Crysta", "Hyundai i10 Grand", "Maruti Baleno", "Ford Ecosport", "Mahindra Scorpio"],
            datasets: [{
                label: "Times Rented",
                data: [2, 5, 3, 10, 5, 18, 12, 15, 20, 11, 9, 4],
                backgroundColor: ["#dc8635", "#6c757d", "#28a745", "#6610f2", "#6c757d", "#17a2b8", "#dc3545", "#c64e98", "#10eaf2", "#007bff", "#ffc107", "#ff5733"],
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Car Rentals" },
            },
        },
    });
};



document.addEventListener("DOMContentLoaded", function () {
    // Sample data for damaged vehicles
    const damagedVehicles = [
        { id: "B123", type: "Bike", description: "Scratched fender", severity: "Low", status: "Resolved", cost: "$50" },
        { id: "C456", type: "Car", description: "Broken headlight", severity: "Medium", status: "Pending", cost: "$150" },
        { id: "S789", type: "Scooty", description: "Dented body", severity: "High", status: "Pending", cost: "$300" },
    ];

    // Sample data for fines and violations
    const finesViolations = [
        {
            id: "B123",
            type: "Bike",
            violation: "Late return",
            fine: "$25",
            date: "2024-10-25",
            status: "Paid",
        },
        {
            id: "C456",
            type: "Car",
            violation: "Traffic violation",
            fine: "$100",
            date: "2024-10-30",
            status: "Unpaid",
        },
        {
            id: "S789",
            type: "Scooty",
            violation: "Parking violation",
            fine: "$50",
            date: "2024-11-02",
            status: "Paid",
        },
    ];


    // Populate damaged vehicles table
    const damagedVehiclesBody = document.getElementById("damagedVehiclesBody");
    damagedVehicles.forEach((vehicle) => {
        const row = document.createElement("tr");

        row.innerHTML = `
                    <td>${vehicle.id}</td>
                    <td>${vehicle.type}</td>
                    <td>${vehicle.description}</td>
                    <td class="${getSeverityClass(vehicle.severity)}">${vehicle.severity}</td>
                    <td class="${getStatusClass(vehicle.status)}">${vehicle.status}</td>
                    <td>${vehicle.cost}</td>
                    <td><button onclick="editDamaged('${vehicle.id}')">Edit</button></td>
                `;

        damagedVehiclesBody.appendChild(row);
    });

    // Populate fines table
    const finesViolationsBody = document.getElementById("finesViolationsBody");
    finesViolations.forEach((fine) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${fine.id}</td>
            <td>${fine.type}</td>
            <td>${fine.violation}</td>
            <td>${fine.fine}</td>
            <td>${fine.date}</td>
            <td class="${getStatusClass(fine.status)}">${fine.status}</td>
            <td><button onclick="editFine('${fine.id}')">Edit</button></td>
        `;

        finesViolationsBody.appendChild(row);
    });

    // Helper function to get class based on severity level
    function getSeverityClass(severity) {
        return { High: "severity-high", Medium: "severity-medium", Low: "severity-low" }[severity] || "";
    }

    // Helper function to get class based on status
    function getStatusClass(status) {
        return { Pending: "status-pending", Resolved: "status-resolved", Paid: "status-resolved", Unpaid: "status-unpaid" }[status] || "";
    }
});

// Function to filter damaged vehicles
function filterDamagedVehicles() {
    const input = document.getElementById("searchDamaged").value.toLowerCase();
    const rows = document.querySelectorAll("#damagedVehiclesBody tr");
    rows.forEach((row) => {
        const cells = row.getElementsByTagName("td");
        const id = cells[0].textContent.toLowerCase();
        const description = cells[2].textContent.toLowerCase();
        row.style.display =
            id.includes(input) || description.includes(input) ? "" : "none";
    });
}

// Function to filter fines
function filterFines() {
    const input = document.getElementById("searchFines").value.toLowerCase();
    const rows = document.querySelectorAll("#finesViolationsBody tr");
    rows.forEach((row) => {
        const cells = row.getElementsByTagName("td");
        const id = cells[0].textContent.toLowerCase();
        const violation = cells[2].textContent.toLowerCase();
        row.style.display =
            id.includes(input) || violation.includes(input) ? "" : "none";
    });
}

// Function to export to CSV
function exportToCSV(type) {
    let csvContent = "data:text/csv;charset=utf-8,";
    if (type === "damaged") {
        const rows = document.querySelectorAll("#damagedVehiclesBody tr");
        rows.forEach((row) => {
            const cols = row.querySelectorAll("td");
            const data = Array.from(cols)
                .map((col) => col.textContent)
                .join(",");
            csvContent += data + "\n";
        });
    } else {
        const rows = document.querySelectorAll("#finesViolationsBody tr");
        rows.forEach((row) => {
            const cols = row.querySelectorAll("td");
            const data = Array.from(cols)
                .map((col) => col.textContent)
                .join(",");
            csvContent += data + "\n";
        });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${type}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to sort the table
function sortTable(type, columnIndex) {
    let tableBody;
    if (type === "damaged") {
        tableBody = document.getElementById("damagedVehiclesBody");
    } else {
        tableBody = document.getElementById("finesViolationsBody");
    }

    const rows = Array.from(tableBody.rows);
    const sortedRows = rows.sort((a, b) => {
        const cellA = a.cells[columnIndex].innerText;
        const cellB = b.cells[columnIndex].innerText;
        if (columnIndex === 5 || columnIndex === 3) {
            // Cost or Fine Amount
            return (
                parseFloat(cellA.replace(/[$,]/g, "")) -
                parseFloat(cellB.replace(/[$,]/g, ""))
            );
        }
        return cellA.localeCompare(cellB);
    });

    // Remove all rows and re-append sorted rows
    tableBody.innerHTML = "";
    sortedRows.forEach((row) => tableBody.appendChild(row));
}

// Function to edit damaged vehicle
function editDamaged(vehicleId) {
    const rows = document.querySelectorAll("#damagedVehiclesBody tr");
    rows.forEach((row) => {
        const cells = row.getElementsByTagName("td");
        if (cells[0].textContent === vehicleId) {
            const newDescription = prompt(
                "Enter new damage description:",
                cells[2].textContent
            );
            if (newDescription) {
                cells[2].textContent = newDescription;
            }
            const newCost = prompt("Enter new estimated cost:", cells[5].textContent);
            if (newCost) {
                cells[5].textContent = newCost;
            }
            const newStatus = prompt(
                "Enter new status (Resolved/Pending):",
                cells[4].textContent
            );
            if (newStatus) {
                cells[4].textContent = newStatus;
                cells[4].className = getStatusClass(newStatus);
            }
        }
    });
}

// Function to edit fines
function editFine(vehicleId) {
    const rows = document.querySelectorAll("#finesViolationsBody tr");
    rows.forEach((row) => {
        const cells = row.getElementsByTagName("td");
        if (cells[0].textContent === vehicleId) {
            const newViolation = prompt(
                "Enter new violation type:",
                cells[2].textContent
            );
            if (newViolation) {
                cells[2].textContent = newViolation;
            }
            const newFine = prompt("Enter new fine amount:", cells[3].textContent);
            if (newFine) {
                cells[3].textContent = newFine;
            }
            const newStatus = prompt(
                "Enter new status (Paid/Unpaid):",
                cells[5].textContent
            );
            if (newStatus) {
                cells[5].textContent = newStatus;
                cells[5].className = getStatusClass(newStatus);
            }
        }
    });
}



// Show scroll-to-top button when scrolling down
// window.onscroll = function () {
//     const scrollToTopBtn = document.getElementById('scrollToTop');
//     if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
//         scrollToTopBtn.style.display = "block";
//     } else {
//         scrollToTopBtn.style.display = "none";
//     }
// };

// // Scroll to top function when the button is clicked
// document.getElementById('scrollToTop').addEventListener('click', function () {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
// });

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

