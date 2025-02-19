// Array of event data with placeholder image
const events = [
  {
    date: "Oct 1st, 2024",
    time: "11:00 am - 2 pm",
    title: "Autumn Club Fair",
    location: "ARC Overlook (top floor)",
    tags: ["Introductions", "Rover Demo"],
    description:
      "TrickFire members, the rover, and other items will be present for you to speak and interact with! Come ask questions about the club, ourselves, and school. We are also happy to help you join the club. UW and Cascadia students are welcome.",
    image: "assets/images/photos/ClubFair.png",
  },
  {
    date: "Nov 13th, 2024",
    time: "11:30 am - 1 pm",
    title: "I <3 UW Bothell Luncheon",
    location: "Westin Bellevue Hotel",
    tags: ["Rover Demo", "Free Food", "RSVP Required"],
    description:
      "TrickFire is demoing at a UWB fundraising event that will raise hundreds of thousands of dollars and have hundreds of attendees. Network, impress, and eat free food! We are one of a few clubs with this opportunity to help the community and ourselves. You must RSVP on the club Discord server to attend.",
    image: "assets/images/photos/LuncheonBanner.jpg",
  },
  {
    date: "Spring 2025",
    time: "",
    title: "TrickFire Robotics Rover Unveiling",
    location: "ARC Overlook (Top Floor)",
    tags: ["Rover Demo", "Free Food"],
    description: "TrickFire is showcasing its rover to UWB and our supporters. Invite your friends, family, and mentors to eat pizza and more, learn about the club, and see the rover in action! Club alumni also are invited. Network! All UWB and Cascadia students are welcome.",
    image: "assets/images/photos/RoverReveal.png",
  },
  {
    date: "Feb 19th, 2025",
    time: "11:00 am - 3 pm",
    title: "Winter Club Fair",
    location: "ARC Overlook & North Creek Events Center",
    tags: ["Fair", "Academic Clubs", "Club Community", "Cultural Clubs"],
    description:
      "If you are interested in joining a club, and/or interested in seeing what clubs we have on campus, come to the Winter Club Fair that is happening February 5th from 11am-3pm in both the ARC Overlook and North Creek Events Center!",
    image: "assets/images/photos/winter_club_fair.png",
  },
];
// Find the current season to help with if the time is a season.
// Helper function to parse the date and time from the event
function parseEventDateTime(event) {
  if (!event.date || typeof event.date !== "string") {
    console.error("Invalid or missing date:", event);
    return null;
  }

  // Remove ordinal suffix (1st, 2nd, 3rd, 4th, etc.)
  const dateParts = event.date.replace(/(\d+)(st|nd|rd|th)/, "$1").split(" ");
  const now = new Date();
  const currentYear = now.getFullYear();
  
  let validDateString = "Jan 1 2025"; // Default fallback
  
  if (dateParts.length < 3) {
    console.warn("Season format detected for:", event.date);
    
    if (dateParts[1] == "Winter") {
      validDateString = `Dec 21 ${currentYear}`;
    } else if (dateParts[1] == "Spring") {
      validDateString = `Mar 21 ${currentYear}`;
    } else if (dateParts[1] == "Summer") {
      validDateString = `Jun 21 ${currentYear}`;
    } else {
      validDateString = `Sep 22 ${currentYear}`;
    }
  } else {
    // Extract date parts (e.g., "Oct 10 24")
    const [month, day, year] = dateParts;
    const fullYear = year.length === 2 ? `20${year}` : year;
    validDateString = `${month} ${day} ${fullYear}`;
  }

  // Convert the time (e.g., "8 pm - 11 pm" -> "8 pm")
  let eventStartTime = event.time;
  if (event.time && typeof event.time === "string") {
    eventStartTime = event.time.split("-")[0].trim(); // Get only start time
  }

  return new Date(`${validDateString} ${eventStartTime}`);
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
    console.log(eventDate);
    if (eventDate < now) {
      // Append to previous events
      previousContainer.appendChild(eventCard);
    } else {
      // Append to upcoming events
      eventContainer.appendChild(eventCard);
    }
  });
};

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
