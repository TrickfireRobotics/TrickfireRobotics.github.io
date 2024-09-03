//When linked to an HTML file this script will append the footer as the last child of the body element.
$(document).ready(function () {
  const footer = $("<footer></footer>");

  footer.html(`
      <hr role="presentation" />
      <div id="footerContentContainer" role="presentation">
        <div id="footerTitleContainer" role = "presentation">
          <a href="./" aria-label = "TrickFire logo and title" aria-roledescription="Go to HomePage">
            <div id="navTitleSection" role="presentation">
              <img
                src="./assets/images/logos/TrickFireLogo.svg"
                alt="TrickFire logo"
              />
            </div>
            <h2>TrickFire<br />Robotics</h2>
          </a>
        </div>
        <section aria-label = "Join us links">
          <h2>Join Us</h2>
          <ul role = "menu">
            <li role  = "menuitem"><a href = "./JoinUs.html">Link 1</a></li>
            <li role = "menuitem"><a href = "./JoinUs.html">Link 2</a></li>
          </ul>
        </section>
        <section aria-label = "Robot links">
          <h2>Robots</h2>
          <ul role = "menu">
            <li role = "menuitem"><a href = "./Robots.html">Link 1</a></li>
            <li role = "menuitem"><a href = "./Robots.html">Link 2</a></li>
            <li role = "menuitem"><a href = "./Robots.html">Link 3</a></li>
          </ul>
        </section>
        <section aria-label = "Contact links">
          <h2>Contact</h2>
          <ul role = "menu">
            <li role = "menuitem">
              <a href="mailto:tfrbtcs@uw.edu" target="_blank"
                ><img
                  src="assets/images/icons/EmailIcon.svg"
                  alt="Email icon"
                />Mail</a
              >
            </li>
            <li role = "menuitem">
              <a
                href="https://www.linkedin.com/company/trickfire-robotics/"
                target="_blank"
                ><img src="assets/images/icons/LinkedInIcon.svg" alt="LinkedIn icon" />
                LinkedIn</a
              >
            </li>
            <li role = "menuitem">
              <a href="https://www.instagram.com/trickfirerobotics/?hl=en" target="_blank"
                ><img
                  src="assets/images/icons/InstagramIcon.svg"
                  alt="Instagram icon"
                />Instagram</a
              >
            </li>
          </ul>
        </section>
      </div>
      <div id="mobileFooterContentContainer" role = "presentation">
        <section id="mobileContactContainer" aria-label = "Contact links">
          <ul role = "menu">
            <li role = "menuitem">
              <a href="mailto:tfrbtcs@uw.edu" target=""
                ><img src="assets/images/icons/EmailIcon.svg" alt="Link to email"
              /></a>
            </li>
            <li role = "menuitem">
              <a
                href="https://www.linkedin.com/company/trickfire-robotics/"
                target="_blank"
                ><img src="assets/images/icons/LinkedInIcon.svg" alt="Link to LinkedIn" />
              </a>
            </li>
            <li role = "menuitem">
              <a href="https://www.instagram.com/trickfirerobotics/?hl=en"
                target = "_blank"
                ><img src="assets/images/icons/InstagramIcon.svg" alt="Link to Instagram"
              /></a>
            </li>
          </ul>
        </section>
        <section id="siteLinkContainer" aria-label = "Page links">
          <ul role = "menu">
            <li role = "menuitem"><a href="./JoinUs.html">Join Us</a></li>
            <li role = "presentation">|</li>
            <li role = "menuitem"><a href="./Robots.html">Robots</a></li>
          </ul>
        </section>
      </div>
      <p>
        Copyright © 2024 TrickFire Robotics.<br />All rights reserved.<br />Bothell,
        WA<br />
      </p>
      `);

  $("body").append(footer);
});