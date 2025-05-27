// Task 1: JavaScript Basics & Setup
// Log "Welcome to the Community Portal" using console.log()
console.log("Welcome to the Community Portal");

// Use an alert to notify when the page is fully loaded
window.onload = function() {
    alert("Welcome to the Local Community Event Portal! The page has loaded.");
};

// Task 2: Syntax, Data Types, and Operators
// Store event details like name, date, and available seats.
const eventName = "Community Fair"; // Use const for event name
const eventDate = "2025-07-20"; // Use const for event date
let availableSeats = 100; // Use let for seats

// Concatenate event info using template literals
console.log(`Event: ${eventName}, Date: ${eventDate}, Seats Available: ${availableSeats}`);

// Use ++ or -- to manage seat count on registration (example)
function registerForEvent() {
    if (availableSeats > 0) {
        availableSeats--; // Decrement seat count
        console.log(`Registered for ${eventName}. Remaining seats: ${availableSeats}`);
    } else {
        console.log("No seats left for this event.");
    }
}
// Example of decrementing seats
registerForEvent(); // Simulate a registration


// Task 5: Objects and Prototypes
// Define Event constructor or class
class Event {
    constructor(name, date, description, image, seats) {
        this.name = name;
        this.date = date;
        this.description = description;
        this.image = image;
        this.seats = seats;
    }

    // Add checkAvailability() to prototype
    checkAvailability() {
        return this.seats > 0;
    }
}

// Mock event data
let communityEvents = [
    new Event("Community Fair", "2025-07-20", "A lively annual gathering.", "https://stories.uwcsea.edu.sg/community-fair-2023/assets/gdPiwSkGvB/2023_02_dover_community-fair-6-2048x1364.jpg", 50),
    new Event("Music Concert", "2025-08-15", "Outdoor summer tunes.", "https://t3.ftcdn.net/jpg/02/21/36/48/360_F_221364834_GsaULQoVVobdJBHCrGHq3SFeO4FMzO66.jpg", 120),
    new Event("Art Workshop", "2025-09-10", "Unleash your creativity.", "https://www.shutterstock.com/image-photo/art-wine-celebration-friends-painting-600nw-2341133585.jpg", 30),
    new Event("Sports Day", "2024-10-25", "Fitness and fun for all ages.", "https://thumbs.dreamstime.com/b/celebration-qatar-national-sport-day-doha-qatar-february-local-people-enjoy-basketball-event-organized-celebration-259593290.jpg", 200),
    new Event("Food Festival", "2025-11-01", "Taste local delights.", "https://curlytales.com/wp-content/uploads/2019/11/shekaan.jpg", 80),
    new Event("Book Club Meeting", "2025-12-05", "Discussions and reads.", "https://images.squarespace-cdn.com/content/v1/60b8aeb15c8bd718aedb3924/7809c937-0d6d-491d-9657-dc916f282301/daniel-zjV8ptYgcEo-unsplash.jpg", 20)
];

// List object keys and values using Object.entries()
console.log("Event details (key-value pairs):");
Object.entries(communityEvents[0]).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});

// Task 6: Arrays and Methods
// Add new events using .push()
function addEvent(event) {
    communityEvents.push(event); // Add new events to the array
    console.log(`${event.name} added to events.`);
    renderEvents(communityEvents);
}

// Example of adding a new event
addEvent(new Event("Yoga Class", "2025-06-30", "Relax and rejuvenate.", "https://example.com/yoga.jpg", 15));


// Task 4: Functions, Scope, Closures, Higher-Order Functions
// Create addEvent() (already part of Task 6)
// Create registerUser() (will be used in form submission)
// Create filterEventsByCategory()

// Use closure to track total registrations for a category
function createRegistrationTracker() {
    const registrations = {};
    return function(category) {
        registrations[category] = (registrations[category] || 0) + 1;
        return registrations[category];
    };
}
const trackCategoryRegistration = createRegistrationTracker();

// Pass callbacks to filter functions for dynamic search
function filterEvents(events, callback) {
    return events.filter(callback);
}

// Task 3: Conditionals, Loops, and Error Handling
// Use if-else to hide past or full events
function isEventDisplayable(event) {
    const today = new Date();
    const eventDateObj = new Date(event.date);
    return eventDateObj >= today && event.checkAvailability();
}

// Loop through the event list and display using forEach()
// Task 7: DOM Manipulation
// Access DOM elements using querySelector()
const eventListContainer = document.querySelector('.event-list');

function renderEvents(eventsToRender) {
    eventListContainer.innerHTML = ''; // Clear existing events
    // Use spread operator to clone event list before filtering
    const currentEvents = [...eventsToRender];
    currentEvents.forEach(event => { // Loop through events using forEach()
        if (isEventDisplayable(event)) { // Use if-else to hide past or full events
            // Create and append event cards using createElement()
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-item', 'eventCard');
            eventCard.innerHTML = `
                <h5>${event.name}</h5>
                <img src="${event.image}" alt="${event.name}" title="${event.name}">
                <p>Date: ${event.date}</p>
                <p>Seats: ${event.seats}</p>
                <p>${event.description}</p>
            `;
            eventListContainer.appendChild(eventCard);
        }
    });
}

// Initial render of events
renderEvents(communityEvents);

// Task 8: Event Handling
// Use onchange to filter events by category (for preferred event type)
const preferredEventTypeSelect = document.getElementById('preferredEventType');
preferredEventTypeSelect.addEventListener('change', (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory) {
        const filtered = filterEvents(communityEvents, event => event.name.includes(selectedCategory)); // Pass callbacks to filter functions
        renderEvents(filtered);
        console.log(`Filtered by category: ${selectedCategory}`);
    } else {
        renderEvents(communityEvents); // Show all if no category selected
    }
});

const clearPreferencesBtn = document.getElementById('clearPreferencesBtn');
clearPreferencesBtn.addEventListener('click', () => {
    preferredEventTypeSelect.value = "";
    renderEvents(communityEvents);
});

// Task 11: Working with Forms
const registrationForm = document.getElementById('registrationForm');
const registrationOutput = document.getElementById('registrationOutput');
const messageTextarea = document.getElementById('message');
const charsRemainingSpan = document.getElementById('charsRemaining');
const phoneInput = document.getElementById('phone');
const phoneErrorSpan = document.getElementById('phoneError');

// Character count for textarea
messageTextarea.addEventListener('input', () => {
    const maxLength = 500;
    const currentLength = messageTextarea.value.length;
    const remaining = maxLength - currentLength;
    charsRemainingSpan.textContent = remaining;
});

// Basic phone number validation
phoneInput.addEventListener('input', () => {
    const phonePattern = /^[0-9\s-()]+$/;
    if (phoneInput.value && !phonePattern.test(phoneInput.value)) {
        phoneErrorSpan.textContent = 'Invalid phone number format.';
    } else {
        phoneErrorSpan.textContent = '';
    }
});

// Prevent default form behavior using event.preventDefault()
registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Capture name, email, and selected event using form.elements
    const name = registrationForm.elements['name'].value;
    const email = registrationForm.elements['email'].value;
    const eventDate = registrationForm.elements['eventDate'].value;
    const eventType = registrationForm.elements['eventType'].value;
    const message = registrationForm.elements['message'].value;

    // Validate inputs and show errors inline
    if (!name || !email || !eventDate || !eventType) {
        registrationOutput.textContent = "Please fill in all required fields.";
        registrationOutput.style.color = 'red';
        return;
    }

    // Task 3: Wrap registration logic in try-catch to handle errors
    try {
        // Task 12: AJAX & Fetch API
        // Use fetch() to POST user data to a mock API
        console.log("Attempting to send registration data..."); // Log form submission steps
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', { // Mock API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                eventDate,
                eventType,
                message,
                status: 'pending'
            }),
        });

        // Check fetch request payload
        console.log("Fetch request payload:", { name, email, eventDate, eventType, message, status: 'pending' });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Registration successful:', data);

        // Show success/failure message after submission
        registrationOutput.textContent = `Registration for ${eventType} on ${eventDate} submitted successfully!`;
        registrationOutput.style.color = 'green';
        registrationForm.reset(); // Clear the form

        // Update UI when user registers
        // This is a simplified UI update; in a real app, you might decrement seats on the displayed event
        // and re-render events if necessary.
        // For demonstration of closure:
        const categoryRegistrations = trackCategoryRegistration(eventType); // Use closure to track total registrations for a category
        console.log(`Total registrations for ${eventType}: ${categoryRegistrations}`);

    } catch (error) {
        console.error('Registration failed:', error); // Debugging: log errors
        registrationOutput.textContent = 'Registration failed. Please try again.';
        registrationOutput.style.color = 'red';
    } finally {
        // Use setTimeout() to simulate a delayed response (optional, for visual effect)
        // setTimeout(() => registrationOutput.textContent = '', 3000);
    }
});

// Geolocation API for "Find Nearby Events"
const findNearbyEventsButton = document.getElementById('findNearbyEventsButton');
const latitudeSpan = document.getElementById('latitude');
const longitudeSpan = document.getElementById('longitude');
const geoStatusParagraph = document.getElementById('geo-status');

// Ensure the button exists before adding an event listener
if (findNearbyEventsButton) {
    findNearbyEventsButton.addEventListener('click', () => {
        if (navigator.geolocation) {
            geoStatusParagraph.textContent = 'Attempting to find your location...';
            geoStatusParagraph.style.color = 'blue'; // Indicate loading state

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    latitudeSpan.textContent = position.coords.latitude.toFixed(4);
                    longitudeSpan.textContent = position.coords.longitude.toFixed(4);
                    geoStatusParagraph.textContent = 'Location found!';
                    geoStatusParagraph.style.color = 'green';
                },
                (error) => {
                    let errorMessage = "Geolocation failed: ";
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage += "User denied the request for Geolocation.";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage += "Location information is unavailable.";
                            break;
                        case error.TIMEOUT:
                            errorMessage += "The request to get user location timed out.";
                            break;
                        case error.UNKNOWN_ERROR:
                            errorMessage += "An unknown error occurred.";
                            break;
                    }
                    geoStatusParagraph.textContent = errorMessage;
                    geoStatusParagraph.style.color = 'red';
                    latitudeSpan.textContent = 'N/A';
                    longitudeSpan.textContent = 'N/A';
                    console.error("Geolocation Error:", error);
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        } else {
            geoStatusParagraph.textContent = 'Geolocation is not supported by your browser.';
            geoStatusParagraph.style.color = 'orange';
            latitudeSpan.textContent = 'N/A';
            longitudeSpan.textContent = 'N/A';
        }
    });
}


// Task 10: Modern JavaScript Features
// Use let, const (already used throughout)
// Use default parameters in functions (example)
function greetUser(userName = "Guest") {
    console.log(`Hello, ${userName}!`);
}
greetUser(); // Hello, Guest!
greetUser("Alice"); // Hello, Alice!

// Use destructuring to extract event details
const { name, date, seats } = communityEvents[0];
console.log(`Destructured Event: Name - ${name}, Date - ${date}, Seats - ${seats}`);
