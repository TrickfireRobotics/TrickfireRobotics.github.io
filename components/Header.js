//When linked to an HTML file this script will append the footer as the last child of the body element.
$(document).ready(function () {
  const header = $("<header></header>"),
    url = new URL(window.location.href).pathname;
  let subpageName, navClass;

  console.log(url);

  //Assign subpageName and navClass according to the current URL path.
  switch (url) {
    case "/":
      subpageName = "HomePage";
      break;
    case "/robots":
      subpageName = "Robots";
      navClass = ".robots";
      break;
    case "/our_story":
      subpageName = "Our Story";
      navClass = ".ourStory";
      break;
    case "/events":
      subpageName = "Events";
      navClass = ".events";
      break;
    case "/join_us":
      subpageName = "Join Us";
      navClass = ".joinUs";
      break;
    case "/sponsor":
      subpageName = "Sponsor";
      navClass = ".sponsor";
      break;
  }

  header.html(` 
    <div class = "contentWidthContainer">
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
            <a class = "robots" href="./robots">Robots</a>
          </li role = "menuitem">
          <li role = "menuitem">
            <a class = "ourStory" href="./our_story">Our Story</a>
          </li>
          <li role = "menuitem">
            <a class = "events" href="./events">Events</a>
          </li>
          <li role = "menuitem">
            <a class = "joinUs" href="./join_us">Join Us</a>
          </li>
          <li role = "menuitem">
            <a class = "sponsor" href="./sponsor">Sponsor</a>
          </li>
        </ul>
      </navbar>
      <a href = "./" aria-roledescription = "Go to HomePage">
        <div id="navTitleSection" role="presentation">
          <img
            src="./assets/images/logos/TrickFireLogoMobile.png"
            alt="TrickFire Logo"
          />
          <h1>TrickFire</h1>
        </div>
      </a>
      <navbar role = "navigation">
        <ul role="menubar">
          <li role = "menuitem">
            <a class = "robots" href="./robots">Robots</a>
          </li role = "menuitem">
          <li role = "menuitem">
            <a class = "ourStory" href="./our_story">Our Story</a>
          </li>
          <li role = "menuitem">
            <a class = "events" href="./events">Events</a>
          </li>
          <li role = "menuitem">
            <a class = "joinUs" href="./join_us">Join Us</a>
          </li>
        </ul>
      </navbar>
      <a id="navSponsorLink" href="./sponsor">Sponsor</a>
    </div>
    `);

  $("body").prepend(header);

  //Set the navbar link of the current page to be bold.
  $(navClass).each(function () {
    $(this).addClass("currPage");
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
