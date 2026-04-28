const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navDropdown = document.querySelector(".nav-dropdown");
const navDropdownToggle = document.querySelector(".nav-dropdown-toggle");
const topButton = document.querySelector(".back-to-top");
const revealItems = document.querySelectorAll(".reveal");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const yearTarget = document.querySelector("#current-year");

const setHeaderState = () => {
  const hasScrolled = window.scrollY > 24;

  if (siteHeader) {
    siteHeader.classList.toggle("scrolled", hasScrolled);
  }

  if (topButton) {
    topButton.classList.toggle("visible", window.scrollY > 480);
  }
};

const closeDropdown = () => {
  if (!navDropdown || !navDropdownToggle) {
    return;
  }

  navDropdown.classList.remove("is-open");
  navDropdownToggle.setAttribute("aria-expanded", "false");
};

const openDropdown = () => {
  if (!navDropdown || !navDropdownToggle) {
    return;
  }

  navDropdown.classList.add("is-open");
  navDropdownToggle.setAttribute("aria-expanded", "true");
};

const toggleDropdown = () => {
  if (!navDropdown) {
    return;
  }

  if (navDropdown.classList.contains("is-open")) {
    closeDropdown();
    return;
  }

  openDropdown();
};

const closeMenu = () => {
  if (menuToggle && siteNav) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    siteNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  closeDropdown();
};

const openMenu = () => {
  if (!menuToggle || !siteNav) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close navigation menu");
  siteNav.classList.add("is-open");
  document.body.classList.add("menu-open");
};

const toggleMenu = () => {
  if (!menuToggle) {
    return;
  }

  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

  if (isExpanded) {
    closeMenu();
    return;
  }

  openMenu();
};

const scrollToSection = (hash) => {
  const target = document.querySelector(hash);
  if (!target || !siteHeader) {
    return;
  }

  const headerOffset = siteHeader.offsetHeight;
  const topPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset + 1;

  window.scrollTo({ top: topPosition, behavior: "smooth" });
};

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", toggleMenu);
}

if (navDropdownToggle) {
  navDropdownToggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleDropdown();
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    const target = href ? document.querySelector(href) : null;

    if (!href || href === "#" || !target) {
      return;
    }

    event.preventDefault();
    closeMenu();
    scrollToSection(href);
  });
});

document.addEventListener("click", (event) => {
  const clickedMenuToggle = menuToggle && menuToggle.contains(event.target);
  const clickedInsideNav = siteNav && siteNav.contains(event.target);
  const clickedInsideDropdown = navDropdown && navDropdown.contains(event.target);

  if (navDropdown && !clickedInsideDropdown) {
    closeDropdown();
  }

  if (menuToggle && siteNav && !clickedInsideNav && !clickedMenuToggle) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener("resize", closeMenu);

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

      if (!field || !error) {
        return;
      }

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
      const value = field?.value || "";
      const isValid = validators[fieldName](value);

      if (isValid || !field || !error) {
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
      "This website form is not connected yet. Please use the email or WhatsApp links below until a real form endpoint is added.";
    formStatus.classList.add("notice");
  });
}

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

if (window.location.hash && document.querySelector(window.location.hash)) {
  window.setTimeout(() => {
    scrollToSection(window.location.hash);
  }, 80);
}
