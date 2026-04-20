const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const navDropdown = document.querySelector(".nav-dropdown");
const navDropdownToggle = document.querySelector(".nav-dropdown-toggle");
const youthMinistryTrigger = document.querySelector(".youth-ministry-trigger");
const youthProgramTabs = document.querySelectorAll("[data-youth-program]");
const youthProgramPanel = document.querySelector("#youth-program-panel");
const topButton = document.querySelector(".back-to-top");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section[id]");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const yearTarget = document.querySelector("#current-year");

const sectionNavAliases = {
  "youth-ministry": "ministries"
};

const youthMinistryPrograms = {
  adventurers: {
    title: "Adventurers Club",
    audience: "Children | Ages 4-9",
    description:
      "The Adventurers Club helps younger children grow in faith through Bible learning, kindness, creativity, family support, and fun guided activities in a Christ-centered environment.",
    lessons: [
      "Creation and God's love",
      "Memory verse practice",
      "Prayer and kindness habits",
      "Nature walks and discovery",
      "Bible songs and storytelling",
      "Crafts and teamwork"
    ],
    highlights: [
      "Family-friendly activities",
      "Character building",
      "Early spiritual development"
    ],
    actionLabel: "Contact Youth Leaders",
    actionTarget: "#contact",
    images: [
      {
        src: "images/Home - Adventist Youth Ministries.jpeg",
        alt: "Placeholder image for Adventurers Bible learning and family-centered ministry",
        caption: "Bible learning, songs, and guided discovery for young children."
      },
      {
        src: "images/WhatsApp Image 2026-04-10 at 08.33.24.jpeg",
        alt: "Placeholder image for Adventurers crafts and teamwork activities",
        caption: "Creative activities that build confidence, kindness, and teamwork."
      },
      {
        src: "images/WhatsApp Image 2026-04-10 at 08.33.30.jpeg",
        alt: "Placeholder image for Adventurers outdoor play and family fellowship",
        caption: "Outdoor play, joyful fellowship, and family-supported spiritual growth."
      }
    ]
  },
  pathfinders: {
    title: "Pathfinder Club",
    audience: "Pre-teens and Teens | Ages 10-15",
    description:
      "The Pathfinder Club helps young people grow spiritually, physically, and socially through Bible study, discipline, service, camping, leadership, and practical skills.",
    lessons: [
      "Bible study and doctrine basics",
      "Marching and drills",
      "Camping and survival skills",
      "Honors and practical learning",
      "Community service projects",
      "Leadership development"
    ],
    highlights: [
      "Outdoor learning",
      "Service and discipline",
      "Strong teamwork"
    ],
    actionLabel: "Contact Youth Leaders",
    actionTarget: "#contact",
    images: [
      {
        src: "images/The Pathfinder Uniform _ NAD.jpeg",
        alt: "Placeholder image for Pathfinder uniforms and club identity",
        caption: "Uniformed learning that strengthens discipline, belonging, and purpose."
      },
      {
        src: "images/WhatsApp Image 2026-04-10 at 08.33.35.jpeg",
        alt: "Placeholder image for Pathfinder camping and outdoor activities",
        caption: "Camping, practical skills, and outdoor growth experiences."
      },
      {
        src: "images/WhatsApp Image 2026-04-10 at 08.33.36.jpeg",
        alt: "Placeholder image for Pathfinder marching and team activities",
        caption: "Marching, teamwork, and service-minded leadership development."
      }
    ]
  },
  ambassadors: {
    title: "Ambassadors Ministry",
    audience: "Older Teens and Young Adults | Ages 16-21",
    description:
      "Ambassadors Ministry helps young people strengthen their identity in Christ, build godly friendships, take part in service, and prepare for responsible Christian leadership.",
    lessons: [
      "Christian identity",
      "Friendship and values",
      "Group Bible discussions",
      "Mentorship and guidance",
      "Service and outreach",
      "Personal growth and purpose"
    ],
    highlights: [
      "Mentorship",
      "Faith conversations",
      "Youth service opportunities"
    ],
    actionLabel: "Contact Youth Leaders",
    actionTarget: "#contact",
    images: [
      {
        src: "images/Club ambassador SDA church.jpeg",
        alt: "Placeholder image for Ambassadors ministry identity and service culture",
        caption: "A ministry space for identity, service, and mature Christian friendships."
      },
      {
        src: "images/Logo des ambassadeurs adventistes jeunes 16 à 21 ans.jpeg",
        alt: "Placeholder image for Ambassadors fellowship and guidance gatherings",
        caption: "Mentorship, guidance, and youth-led fellowship conversations."
      },
      {
        src: "images/WhatsApp Image 2026-04-10 at 08.33.45.jpeg",
        alt: "Placeholder image for Ambassadors outreach and group discussions",
        caption: "Service projects, group discussions, and purposeful spiritual growth."
      }
    ]
  },
  "senior-youth": {
    title: "Senior Youth Ministry",
    audience: "Young Adults | Ages 18+",
    description:
      "Senior Youth Ministry supports young adults as they grow in faith, leadership, church participation, outreach, and practical life decisions while building a strong spiritual community.",
    lessons: [
      "Faith and daily life",
      "Career and calling",
      "Relationships and values",
      "Bible reflection and discussion",
      "Youth-led worship and outreach",
      "Leadership in church service"
    ],
    highlights: [
      "Leadership growth",
      "Real-life spiritual guidance",
      "Community involvement"
    ],
    actionLabel: "Contact Youth Leaders",
    actionTarget: "#contact",
    images: [
      {
        src: "images/WhatsApp Image 2026-04-10 at 08.33.44.jpeg",
        alt: "Placeholder image for senior youth worship and discussion",
        caption: "Bible reflection, life conversations, and young-adult fellowship."
      },
      {
        src: "images/WhatsApp Image 2026-04-10 at 08.33.46.jpeg",
        alt: "Placeholder image for senior youth outreach and leadership",
        caption: "Outreach, worship planning, and service-led leadership growth."
      },
      {
        src: "images/WhatsApp Image 2026-04-10 at 08.33.47.jpeg",
        alt: "Placeholder image for senior youth community and mentoring",
        caption: "A strong community for calling, mentorship, and everyday faithfulness."
      }
    ]
  }
};

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
  if (!target || !siteHeader) {
    return;
  }

  const headerOffset = siteHeader.offsetHeight;
  const topPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset + 1;
  window.scrollTo({ top: topPosition, behavior: "smooth" });
};

const setActiveLink = (id) => {
  const resolvedId = sectionNavAliases[id] || id;
  let dropdownChildIsActive = false;

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const isDonateLink = link.classList.contains("nav-donate");
    const isMatch = href === `#${resolvedId}`;

    if (!isDonateLink) {
      link.classList.toggle("is-active", isMatch);
    }

    if (link.closest(".nav-dropdown-menu") && isMatch) {
      dropdownChildIsActive = true;
    }
  });

  if (navDropdownToggle) {
    navDropdownToggle.classList.toggle("is-active", dropdownChildIsActive);
  }
};

const renderYouthProgram = (programKey) => {
  if (!youthProgramPanel) {
    return;
  }

  const program = youthMinistryPrograms[programKey];
  if (!program) {
    return;
  }

  youthProgramPanel.innerHTML = `
    <div class="youth-program-header">
      <div class="youth-program-title-wrap">
        <span class="youth-program-audience">${program.audience}</span>
        <h3>${program.title}</h3>
      </div>
      <button class="button button-secondary youth-program-action" type="button" data-panel-target="${program.actionTarget}">
        ${program.actionLabel}
      </button>
    </div>
    <p class="youth-program-description">${program.description}</p>
    <div class="youth-program-meta-grid">
      <article class="youth-program-block">
        <h4>Lesson Plans / Weekly Themes</h4>
        <ul class="youth-program-list">
          ${program.lessons.map((lesson) => `<li>${lesson}</li>`).join("")}
        </ul>
      </article>
      <article class="youth-program-block">
        <h4>Highlights</h4>
        <ul class="youth-program-list youth-program-highlights">
          ${program.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}
        </ul>
      </article>
    </div>
    <div class="youth-program-gallery">
      ${program.images
        .map(
          (image) => `
            <figure class="youth-gallery-card">
              <img src="${image.src}" alt="${image.alt}">
              <figcaption>${image.caption}</figcaption>
            </figure>
          `
        )
        .join("")}
    </div>
  `;

  const activeTab = document.querySelector(`[data-youth-program="${programKey}"]`);
  if (activeTab) {
    youthProgramPanel.setAttribute("aria-labelledby", activeTab.id);
  }

  const actionButton = youthProgramPanel.querySelector(".youth-program-action");
  if (actionButton) {
    actionButton.addEventListener("click", () => {
      scrollToSection(actionButton.dataset.panelTarget);
    });
  }
};

const setYouthProgram = (programKey) => {
  if (!youthProgramTabs.length || !youthProgramPanel || !youthMinistryPrograms[programKey]) {
    return;
  }

  youthProgramTabs.forEach((tab) => {
    const isActive = tab.dataset.youthProgram === programKey;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  renderYouthProgram(programKey);
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

if (youthMinistryTrigger) {
  youthMinistryTrigger.addEventListener("click", () => {
    scrollToSection(youthMinistryTrigger.dataset.scrollTarget || "#youth-ministry");
  });
}

if (youthProgramTabs.length && youthProgramPanel) {
  const orderedYouthTabs = Array.from(youthProgramTabs);

  orderedYouthTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setYouthProgram(tab.dataset.youthProgram);
    });

    tab.addEventListener("keydown", (event) => {
      const currentIndex = orderedYouthTabs.indexOf(tab);
      let nextIndex = currentIndex;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextIndex = (currentIndex + 1) % orderedYouthTabs.length;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        nextIndex = (currentIndex - 1 + orderedYouthTabs.length) % orderedYouthTabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = orderedYouthTabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      const nextTab = orderedYouthTabs[nextIndex];
      nextTab.focus();
      setYouthProgram(nextTab.dataset.youthProgram);
    });
  });

  const defaultProgramKey =
    orderedYouthTabs.find((tab) => tab.getAttribute("aria-selected") === "true")?.dataset.youthProgram ||
    orderedYouthTabs[0].dataset.youthProgram;

  setYouthProgram(defaultProgramKey);
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetHash = link.getAttribute("href");
    const target = targetHash ? document.querySelector(targetHash) : null;

    if (!targetHash || targetHash === "#" || !target) {
      return;
    }

    event.preventDefault();
    closeMenu();
    scrollToSection(targetHash);
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.closest(".site-nav")) {
      return;
    }

    const href = link.getAttribute("href");
    const target = href ? document.querySelector(href) : null;

    if (!href || href === "#" || !target) {
      return;
    }

    event.preventDefault();
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

window.addEventListener("resize", () => {
  closeMenu();
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
