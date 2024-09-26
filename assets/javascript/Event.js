// Array of event data with placeholder image
const events = [
  /*
  {
    date: "Sep 15th, 24",
    time: "5 pm - 7 pm",
    title: "Welcome Meeting",
    location: "Room 101",
    tags: ["Introduction", "Team"],
    description:
      "A fun and engaging orientation session to kickstart the new term!",
    image: "assets/images/photos/outreach_trickfire_robotics_compressed.jpg",
  },
  {
    date: "Oct 10th, 24",
    time: "8 pm - 11 pm",
    title: "Kick Off & Orientation",
    location: "UWB INV-011",
    tags: ["Introductions", "Sub-teams"],
    description:
      "A fun and engaging orientation session to kickstart the new term!",
    image: "assets/images/photos/outreach_trickfire_robotics_compressed.jpg",
  },
  {
    date: "Nov 20th, 24",
    time: "3 pm - 6 pm",
    title: "Hackathon Event",
    location: "Auditorium 3",
    tags: ["Coding", "Competition"],
    description:
      "A fun and engaging orientation session to kickstart the new term!",
    image: "assets/images/photos/outreach_trickfire_robotics_compressed.jpg",
  },
  {
    date: "Nov 20th, 24",
    time: "3 pm - 6 pm",
    title: "Hackathon Event",
    location: "Auditorium 3",
    tags: ["Coding", "Competition"],
    description:
      "A fun and engaging orientation session to kickstart the new term!",
    image: "assets/images/photos/outreach_trickfire_robotics_compressed.jpg",
  },
  {
    date: "Nov 20th, 24",
    time: "3 pm - 6 pm",
    title: "Hackathon Event",
    location: "Auditorium 3",
    tags: ["Coding", "Competition"],
    description:
      "A fun and engaging orientation session to kickstart the new term!",
    image: "assets/images/photos/outreach_trickfire_robotics_compressed.jpg",
  },
  {
    date: "Nov 20th, 23",
    time: "3 pm - 6 pm",
    title: "Hackathon Event",
    location: "Auditorium 3",
    tags: ["Coding", "Competition"],
    description:
      "A fun and engaging orientation session to kickstart the new term!",
    image: "assets/images/photos/outreach_trickfire_robotics_compressed.jpg",
  },
  {
    date: "Nov 20th, 23",
    time: "3 pm - 6 pm",
    title: "Hackathon Event",
    location: "Auditorium 3",
    tags: ["Coding", "Competition"],
    description:
      "A fun and engaging orientation session to kickstart the new term!",
    image: "assets/images/photos/outreach_trickfire_robotics_compressed.jpg",
  },
*/
];
// Helper function to parse the date and time from the event
function parseEventDateTime(event) {
  // Remove ordinal suffix (1st, 2nd, 3rd, 4th, etc.)
  const dateParts = event.date.replace(/(\d+)(st|nd|rd|th)/, "$1"); // Removes 'th', 'nd', 'rd', etc.

  // Split the date string into parts (e.g., "Oct 10th, 24" -> ["Oct", "10", "24"])
  const [month, day, year] = dateParts.split(" ");

  // Convert the year to full format (e.g., "24" -> "2024")
  const fullYear = year.length === 2 ? `20${year}` : year;

  // Convert the time (e.g., "8 pm - 11 pm" -> "8 pm")
  const eventStartTime = event.time.split("-")[0].trim(); // Only the start time is needed for comparison

  // Construct a valid date string (e.g., "Oct 10 2024 8:00 pm")
  const validDateString = `${month} ${day} ${fullYear}`;
  // Parse the date string into a JavaScript Date object
  return new Date(validDateString);
}

//Helper factory function we use to create elements. Note: please specify an empty string if you need a future parameter but not the current one.
function createElement(tag, className, text = "", src = "", alt = "") {
  const element = document.createElement(tag);
  if (text) element.textContent = text;
  if (className) element.classList.add(className);
  if (src) element.src = src;
  if (alt) element.setAttribute("alt", alt);
  return element;
}

// Function to create the event card for Desktop screens
function createDeskTopEventCard(event) {
  // Creating a new div for the event card
  const eventCard = createElement("div", "event-card");

  // Creating the image container
  const imageContainer = createElement("div", "image-container");
  const eventImage = createElement(
    "img",
    "event",
    "",
    event.image,
    "Event Image"
  );
  imageContainer.appendChild(eventImage);

  // Creating the time container
  const timeContainer = createElement("div", "time");
  const dateDiv = createElement("div", "date");
  const clockImg = createElement(
    "img",
    "clock",
    "",
    "assets/images/icons/clock.svg",
    "Clock icon"
  );
  const dateText = createElement("h3", "", event.date);
  dateDiv.appendChild(clockImg);
  dateDiv.appendChild(dateText);

  const hourDiv = createElement("div", "hour");
  const hourText = createElement("h3", "", event.time);
  hourDiv.appendChild(hourText);
  timeContainer.appendChild(dateDiv);
  timeContainer.appendChild(hourDiv);

  // Creating the title of the event
  const titleDiv = createElement("div", "title");
  const titleText = createElement("h2", "", event.title);
  titleDiv.appendChild(titleText);

  // Creating the location
  const locationDiv = createElement("div", "location");
  const locationImg = createElement(
    "img",
    "waypoint",
    "",
    "assets/images/icons/waypoint.png",
    "Waypoint icon"
  );
  const locationText = createElement("h3", "", event.location);
  locationDiv.appendChild(locationImg);
  locationDiv.appendChild(locationText);

  // Creating the tags
  const tagsDiv = createElement("div", "tags");
  if (event.tags.length > 0) {
    event.tags.forEach((tag) => {
      const tagElement = createElement("div");
      const tagText = createElement("p", "", tag);
      tagElement.appendChild(tagText);
      tagsDiv.appendChild(tagElement);
    });
  } else {
    tagsDiv.classList.add("hidden"); // Hide the tag div if there is no tag
  }

  // Append everything to the event card
  eventCard.appendChild(imageContainer);
  imageContainer.appendChild(timeContainer);
  eventCard.appendChild(titleDiv);
  eventCard.appendChild(locationDiv);
  eventCard.appendChild(tagsDiv);

  eventCard.dataset.eventInfo = JSON.stringify(event);

  return eventCard;
}
// Function to create the event card for mobile screens
function createMobileEventCard(event) {
  // Creating a new div for the event card
  const eventCard = createElement("div", "event-card");

  // Creating the image
  const eventImage = createElement(
    "img",
    "event",
    "",
    event.image,
    "Event Image"
  );

  // Creating the container for the title and time
  const titleTimeContainer = createElement("div", "titleAndTime");
  // Creating the time container
  const timeContainer = createElement("div", "time");
  const dateDiv = createElement("div", "date");
  const clockImg = createElement(
    "img",
    "clock",
    "",
    "assets/images/icons/clock.svg",
    "Clock icon"
  );
  const dateText = createElement("h3", "", event.date);
  dateDiv.appendChild(clockImg);
  dateDiv.appendChild(dateText);

  const hourDiv = createElement("div", "hour");
  const hourText = createElement("h3", "", event.time);
  hourDiv.appendChild(hourText);
  timeContainer.appendChild(dateDiv);
  timeContainer.appendChild(hourDiv);

  // Creating the title of the event
  const titleDiv = createElement("div", "title");
  const titleText = createElement("h2", "", event.title);
  titleDiv.appendChild(titleText);

  // Append everything to the event card
  titleTimeContainer.appendChild(titleDiv);
  titleTimeContainer.appendChild(timeContainer);
  eventCard.appendChild(titleTimeContainer);
  eventCard.appendChild(eventImage);

  eventCard.dataset.eventInfo = JSON.stringify(event);

  return eventCard;
}
// Function to organize cards into previous and upcoming events
function addEventCards() {
  const eventContainer = document.querySelector(".upcoming-events");
  const previousContainer = document.querySelector(".previous-events");
  const now = new Date();
  let eventCard;

  events.forEach((event) => {
    const eventDate = parseEventDateTime(event);
    if (window.innerWidth <= 1000) {
      eventCard = createMobileEventCard(event);
    } else {
      eventCard = createDeskTopEventCard(event);
    }

    if (eventDate > now) {
      // Append to upcoming events
      eventContainer.appendChild(eventCard);
    } else {
      // Append to previous events
      previousContainer.appendChild(eventCard);
    }
  });
}

// Function to handle slider
function initSlider() {
  const eventContainers = document.querySelector(".upcoming-events");
  const nxtBtn = document.querySelector(".next-button");
  const backBtn = document.querySelector(".back-button");

  let containerDimensions = eventContainers.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtn.addEventListener("click", () => {
    eventContainers.scrollLeft += containerWidth; // Scroll right
  });

  backBtn.addEventListener("click", () => {
    eventContainers.scrollLeft -= containerWidth; // Scroll left
  });
}

// Add event cards and initialize slider on page load
addEventCards();
initSlider();

// Popup Javascript

// Getting the elements
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

// Getting the content elements
const popupTitle = document.getElementById("popup-title");
const popupImg = document.getElementById("popup-img");
const popupDate = document.getElementById("popup-date");
const popupTime = document.getElementById("popup-time");
const popupLocation = document.getElementById("popup-location");
const popupDescription = document.getElementById("popup-description");

// Function to open the popup and put in Event Data
function openPopup(eventData) {
  popupTitle.textContent = eventData.title;
  popupImg.src = eventData.image;
  popupDate.textContent = eventData.date;
  popupTime.textContent = eventData.time;
  popupLocation.textContent = eventData.location;
  popupDescription.textContent = eventData.description;

  // Revealing the popup
  popup.style.display = "flex";
}

function addPopupEventListeners() {
  document.querySelectorAll(".event-card").forEach((card, index) => {
    card.addEventListener("click", () => {
      const eventData = JSON.parse(card.dataset.eventInfo);
      openPopup(eventData);
    });
  });
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
}

// Mobile Commands for UI

// Get references to the elements
const upcomingButton = document.getElementById("upcoming-header");
const previousButton = document.getElementById("previous-header");
const upcomingEvents = document.querySelector(".upcoming-card-wrapper");
const previousEvents = document.querySelector(".previous-events-wrapper");

// Function to show upcoming events
function showUpcomingEvents() {
  upcomingEvents.style.display = "flex";
  previousEvents.style.display = "none";

  // Add active class to style the selected button
  upcomingButton.classList.add("active");
  previousButton.classList.remove("active");
}

// Function to show previous events
function showPreviousEvents() {
  upcomingEvents.style.display = "none";
  previousEvents.style.display = "flex";
  // Add active class to style the selected button
  upcomingButton.classList.remove("active");
  previousButton.classList.add("active");
}
function showAllEvents() {
  previousEvents.style.display = "flex";
  upcomingEvents.style.display = "flex";
  upcomingButton.classList.add("active");
  previousButton.classList.remove("active");
}

// Add event listeners to the titles
upcomingButton.addEventListener("click", showUpcomingEvents);
previousButton.addEventListener("click", showPreviousEvents);

function resetEventCards() {
  const eventCards = document.querySelectorAll(".event-card");

  // Clear current event cards
  eventCards.forEach((card) => {
    card.remove();
  });
}

let flag = false;

window.addEventListener("resize", () => {
  const width = window.innerWidth;

  if (width >= 1000 && !flag) {
    resetEventCards();
    addEventCards();
    addPopupEventListeners();
    flag = true;
    showAllEvents();
  } else if (width < 1000 && flag) {
    resetEventCards();
    addEventCards();
    addPopupEventListeners();
    flag = false;
    showUpcomingEvents();
  }
});

addPopupEventListeners();
