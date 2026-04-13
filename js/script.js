const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const topButton = document.querySelector(".back-to-top");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section[id]");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const yearTarget = document.querySelector("#current-year");

const setHeaderState = () => {
  const hasScrolled = window.scrollY > 24;
  siteHeader.classList.toggle("scrolled", hasScrolled);
  topButton.classList.toggle("visible", window.scrollY > 480);
};

const closeMenu = () => {
  menuToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

const openMenu = () => {
  menuToggle.setAttribute("aria-expanded", "true");
  siteNav.classList.add("is-open");
  document.body.classList.add("menu-open");
};

const toggleMenu = () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  if (isExpanded) {
    closeMenu();
    return;
  }

  openMenu();
};

const scrollToSection = (hash) => {
  const target = document.querySelector(hash);
  if (!target) {
    return;
  }

  const headerOffset = siteHeader.offsetHeight;
  const topPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset + 1;
  window.scrollTo({ top: topPosition, behavior: "smooth" });
};

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    const isMatch = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", isMatch);
  });
};

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", toggleMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetHash = link.getAttribute("href");
      closeMenu();
      scrollToSection(targetHash);
    });
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = siteNav.contains(event.target) || menuToggle.contains(event.target);
    if (!clickedInsideMenu) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      closeMenu();
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.closest(".site-nav")) {
      return;
    }

    const href = link.getAttribute("href");
    if (!href || href === "#") {
      return;
    }

    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    event.preventDefault();
    scrollToSection(href);
  });
});

if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

if (sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: "-40% 0px -45% 0px", threshold: 0.1 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

if (topButton) {
  topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (contactForm && formStatus) {
  const fields = ["name", "email", "subject", "message"];

  const validators = {
    name: (value) => value.trim().length >= 2,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    subject: (value) => value.trim().length >= 3,
    message: (value) => value.trim().length >= 20
  };

  const messages = {
    name: "Please enter your name.",
    email: "Please enter a valid email address.",
    subject: "Please add a short subject.",
    message: "Please enter at least 20 characters in your message."
  };

  const clearErrors = () => {
    fields.forEach((fieldName) => {
      const field = contactForm.elements[fieldName];
      const error = contactForm.querySelector(`[data-for="${fieldName}"]`);
      field.setAttribute("aria-invalid", "false");
      error.textContent = "";
    });
  };

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();
    formStatus.textContent = "";
    formStatus.className = "form-status";

    let firstInvalidField = null;

    fields.forEach((fieldName) => {
      const field = contactForm.elements[fieldName];
      const error = contactForm.querySelector(`[data-for="${fieldName}"]`);
      const value = field.value;
      const isValid = validators[fieldName](value);

      if (isValid) {
        return;
      }

      field.setAttribute("aria-invalid", "true");
      error.textContent = messages[fieldName];

      if (!firstInvalidField) {
        firstInvalidField = field;
      }
    });

    if (firstInvalidField) {
      formStatus.textContent = "Please correct the highlighted fields and try again.";
      formStatus.classList.add("error");
      firstInvalidField.focus();
      return;
    }

    formStatus.textContent =
      "Thank you for reaching out. This demo form is validated and ready to connect to your email or backend service.";
    formStatus.classList.add("success");
    contactForm.reset();
  });
}

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();
