//When linked to an HTML file this script will append the footer as the last child of the body element.
$(document).ready(function () {
  const header = $("<header></header>"),
    url = new URL(window.location.href).pathname;
  let subpageName, navClass;

  //Assign subpageName and navClass according to the current URL path.
  switch (url) {
    case "/":
      subpageName = "HomePage";
      break;
    case "/Robots.html":
      subpageName = "Robots";
      navClass = ".robots";
      break;
    case "/OurStory.html":
      subpageName = "Our Story";
      navClass = ".ourStory";
      break;
    case "/Events.html":
      subpageName = "Events";
      navClass = ".events";
      break;
    case "/JoinUs.html":
      subpageName = "Join Us";
      navClass = ".joinUs";
      break;
    case "/Sponsor.html":
      subpageName = "Sponsor";
      navClass = ".sponsor";
      break;
  }

  header.html(` 
      <button aria-roledescription = "Open the nav menu" aria-haspopup = "true" aria-expanded = "false">
        <img
          src="./assets/images/icons/MenuIcon.svg"
          alt="Menu Icon"
        />
        <p id="currentPageTitle" aria-roledescription="Current page">${subpageName}</p>
      </button>
      <navbar id = "dropDownNav" role = "navigation" aria-hidden = "true">
        <ul role="menubar">
          <li role = "menuitem">
            <a class = "robots" href="./Robots.html">Robots</a>
          </li role = "menuitem">
          <li role = "menuitem">
            <a class = "ourStory" href="./OurStory.html">Our Story</a>
          </li>
          <li role = "menuitem">
            <a class = "events" href="./Events.html">Events</a>
          </li>
          <li role = "menuitem">
            <a class = "joinUs" href="./JoinUs.html">Join Us</a>
          </li>
          <li role = "menuitem">
            <a class = "sponsor" href="./Sponsor.html">Sponsor</a>
          </li>
        </ul>
      </navbar>
      <a href = "./" aria-roledescription = "Go to HomePage">
        <div id="navTitleSection" role="presentation">
          <img
            src="./assets/images/icons/TrickFireLogo.svg"
            alt="TrickFire Logo"
          />
          <h1>TrickFire</h1>
        </div>
      </a>
      <navbar role = "navigation">
        <ul role="menubar">
          <li role = "menuitem">
            <a class = "robots" href="./Robots.html">Robots</a>
          </li role = "menuitem">
          <li role = "menuitem">
            <a class = "ourStory" href="./OurStory.html">Our Story</a>
          </li>
          <li role = "menuitem">
            <a class = "events" href="./Events.html">Events</a>
          </li>
          <li role = "menuitem">
            <a class = "joinUs" href="./JoinUs.html">Join Us</a>
          </li>
        </ul>
      </navbar>
      <a id="navSponsorLink" href="./Sponsor.html">Sponsor</a>`);

  $("body").prepend(header);

  //Set the navbar link of the current page to be bold.
  $(navClass).each(function () {
    $(this).css("font-weight", "bold");
  });

  //Assign click event listener to dropdown menu button to toggle aria roles. This also toggles the display of the dropdown menu.
  $("header button").on("click", function () {
    const dropdown = $("navbar#dropDownNav"),
      button = $("header button");
    if (dropdown.attr("aria-hidden") === "true") {
      dropdown.attr("aria-hidden", "false");
      button.attr("aria-expanded", "true");
    } else {
      dropdown.attr("aria-hidden", "true");
      button.attr("aria-expanded", "false");
    }
  });
});
