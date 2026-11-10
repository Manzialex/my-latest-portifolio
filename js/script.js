const navlinks = document.querySelectorAll(".nav-link");

navlinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navlinks.forEach(function (item) {
      item.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    });
    link.classList.add("active");
  });
});

// automatic navigation Highlighting

const sections = document.querySelectorAll("main section[id]");

const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: "-30% 0px -60% 0px",
};

const sectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      const currentSectionId = entry.target.id;
      navlinks.forEach(function (link) {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}, observerOptions);

// oberve every section
sections.forEach(function (section) {
  sectionObserver.observe(section);
});

// mobile navigation

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

menuToggle.addEventListener("click", function () {
  sidebar.classList.toggle("open");
  sidebarOverlay.classList.toggle("active");

  const isOpen = sidebar.classList.contains("open");
  menuToggle.setAttribute("aria-expand", isOpen);

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "close navigation" : "open navigation",
  );
  menuToggle.innerHTML = isOpen
    ? '<i class="bi bi-x-lg"></i>'
    : '<i class="bi bi-list"></i>';
});

// close sidebar after selecting a navigation link

navlinks.forEach(function (link) {
  link.addEventListener("click", function () {
    sidebar.classList.remove("open");

    menuToggle.classList.remove("active");

    menuToggle.innerHTML = '<i class="bi bi-list"></i>';

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Close sidebar when overlay is clicked

sidebarOverlay.addEventListener("click", function () {
  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("active");

  menuToggle.innerHTML = '<i class="bi bi-list"></i>';
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
});

// CONTACT FORM INTERACTION

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  formStatus.textContent =
    "Form validated successfully! Message sending is not connected yet.";

  contactForm.reset();
});

// SCROLL REVEAL ANIMATIONS

const revealElements = document.querySelectorAll(
  ".about-content, .skill-card, .project-card, .timeline-item, .contact-content",
);

const revealObserver = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

// Observe all selected elements

revealElements.forEach(function (element) {
  element.classList.add("reveal");
  revealObserver.observe(element);
});

// Select all Like buttons on the page
const likeButtons = document.querySelectorAll(".like-btn");

for (let i = 0; i < likeButtons.length; i++) {
  let likes = 0;
  const button = likeButtons[i];

  button.addEventListener("click", function () {
    likes++;

    // Select the heart icon and count display
    const icon = button.querySelector("i");
    const count = button.querySelector(".like-count");
    const label = button.querySelector(".like-label");

    count.textContent = likes;

    // Conditional statement to update the heart
    if (likes > 0) {
      icon.classList.replace("bi-heart", "bi-heart-fill");
      button.classList.add("liked");
    } else {
      icon.classList.replace("bi-heart-fill", "bi-heart");
      button.classList.remove("liked");
    }

    // Display the correct word depending on the count
    if (likes === 1) {
      label.textContent = "Like";
    } else {
      label.textContent = "Likes";
    }
  });
}
