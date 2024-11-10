// Save user profile data
function saveProfile() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    if (name && email && phone) {
        alert('Profile updated successfully!');
        // Here, you can add logic to save data to a server or localStorage
    } else {
        alert('Please fill out all fields!');
    }
}

// Save user preferences for vehicle types
function savePreferences() {
    const preferredVehicle = document.getElementById('preferredVehicle');
    const selectedVehicles = Array.from(preferredVehicle.selectedOptions).map(option => option.value);

    if (selectedVehicles.length > 0) {
        alert('Preferences saved!');
        // Here, you can add logic to save preferences to a server or localStorage
    } else {
        alert('Please select at least one vehicle type!');
    }
}

// Add new payment method
function addPaymentMethod() {
    const paymentMethod = prompt('Enter new payment method (e.g., Credit Card, PayPal):');
    if (paymentMethod) {
        const paymentMethodsList = document.getElementById('paymentMethodsList');
        const li = document.createElement('li');
        li.textContent = paymentMethod;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.onclick = function() {
            paymentMethodsList.removeChild(li);
        };
        li.appendChild(removeBtn);
        paymentMethodsList.appendChild(li);
    } else {
        alert('Payment method cannot be empty!');
    }
}

// Add new address
function addAddress() {
    const address = prompt('Enter new address:');
    if (address) {
        const addressList = document.getElementById('addressList');
        const li = document.createElement('li');
        li.textContent = address;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.onclick = function() {
            addressList.removeChild(li);
        };
        li.appendChild(removeBtn);
        addressList.appendChild(li);
    } else {
        alert('Address cannot be empty!');
    }
}

// Initialize or load previous data (for example, from localStorage)
function loadProfileData() {
    // Load saved profile data if any (using localStorage or a backend server)
    const savedName = localStorage.getItem('userName');
    const savedEmail = localStorage.getItem('userEmail');
    const savedPhone = localStorage.getItem('userPhone');
    const savedPreferences = JSON.parse(localStorage.getItem('userPreferences')) || [];

    // Set values in input fields if available
    if (savedName) document.getElementById('name').value = savedName;
    if (savedEmail) document.getElementById('email').value = savedEmail;
    if (savedPhone) document.getElementById('phone').value = savedPhone;

    // Set selected preferences
    const preferredVehicleSelect = document.getElementById('preferredVehicle');
    for (let option of preferredVehicleSelect.options) {
        if (savedPreferences.includes(option.value)) {
            option.selected = true;
        }
    }

    // Load saved payment methods
    const savedPayments = JSON.parse(localStorage.getItem('userPayments')) || [];
    const paymentMethodsList = document.getElementById('paymentMethodsList');
    savedPayments.forEach(paymentMethod => {
        const li = document.createElement('li');
        li.textContent = paymentMethod;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.onclick = function() {
            paymentMethodsList.removeChild(li);
            // Update saved data
            const updatedPayments = savedPayments.filter(item => item !== paymentMethod);
            localStorage.setItem('userPayments', JSON.stringify(updatedPayments));
        };
        li.appendChild(removeBtn);
        paymentMethodsList.appendChild(li);
    });

    // Load saved addresses
    const savedAddresses = JSON.parse(localStorage.getItem('userAddresses')) || [];
    const addressList = document.getElementById('addressList');
    savedAddresses.forEach(address => {
        const li = document.createElement('li');
        li.textContent = address;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.onclick = function() {
            addressList.removeChild(li);
            // Update saved data
            const updatedAddresses = savedAddresses.filter(item => item !== address);
            localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses));
        };
        li.appendChild(removeBtn);
        addressList.appendChild(li);
    });
}

// Save data to localStorage when profile is updated
window.addEventListener('beforeunload', () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const preferredVehicle = Array.from(document.getElementById('preferredVehicle').selectedOptions).map(option => option.value);
    
    // Save profile data
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPhone', phone);
    localStorage.setItem('userPreferences', JSON.stringify(preferredVehicle));
});

document.addEventListener('DOMContentLoaded', loadProfileData);



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
