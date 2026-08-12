import Swiper from "swiper";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./app.css";

// Footer Year
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// Navbar Styling on Scroll
const header = document.getElementById("header");
const topbar = document.getElementById("topbar");
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    if (header) {
      header.classList.add("shadow-sm");
    }

    if (topbar) {
      topbar.classList.add("h-0", "opacity-0", "py-0");
      topbar.classList.remove("py-2.5");
    }

    if (navbar) {
      navbar.classList.remove("py-4");
      navbar.classList.add("py-3");
    }
  } else {
    if (header) {
      header.classList.remove("shadow-sm");
    }

    if (topbar) {
      topbar.classList.remove("h-0", "opacity-0", "py-0");
      topbar.classList.add("py-2.5");
    }

    if (navbar) {
      navbar.classList.add("py-4");
      navbar.classList.remove("py-3");
    }
  }
});

// Mobile Menu
const btn = document.getElementById("mobile-menu-btn");
const menu = document.getElementById("mobile-menu");
const links = document.querySelectorAll(".mobile-link");

if (btn && menu) {
  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
    });
  });
}

// Typewriter Effect
const titles = [
  "FullStack Web Developer",
  "React JS Specialist",
  "Laravel & PHP Expert",
  "E-Commerce Developer",
];

let count = 0;
let index = 0;
let isDeleting = false;

function type() {
  const typewriterElem = document.getElementById("typewriter");

  if (!typewriterElem) {
    return;
  }

  const currentText = titles[count % titles.length];

  const letter = isDeleting
    ? currentText.slice(0, --index)
    : currentText.slice(0, ++index);

  typewriterElem.textContent = letter;

  let speed = isDeleting ? 30 : 80;

  if (!isDeleting && letter === currentText) {
    speed = 2500;
    isDeleting = true;
  } else if (isDeleting && letter === "") {
    isDeleting = false;
    count++;
    speed = 500;
  }

  setTimeout(type, speed);
}

setTimeout(type, 1000);

// Counter Animation Setup
const counters = document.querySelectorAll(".counter");
let animated = false;

const animateCounters = () => {
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const duration = 2000;
    const increment = target / (duration / 16);

    let current = 0;

    const updateCounter = () => {
      current += increment;

      if (current < target) {
        counter.innerText = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
};

// Scroll Reveal & Trigger Counters
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        if (entry.target.classList.contains("divide-slate-100") && !animated) {
          animateCounters();
          animated = true;
        }

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  },
);

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});

// Portfolio Filtering
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => {
      b.classList.remove(
        "bg-primary-600",
        "text-white",
        "shadow-md",
        "border-primary-600",
        "hover:bg-white",
      );

      b.classList.add(
        "bg-white",
        "border-slate-200",
        "text-slate-600",
        "hover:border-primary-300",
      );
    });

    btn.classList.add(
      "bg-primary-600",
      "text-white",
      "shadow-md",
      "border-primary-600",
      "hover:bg-white",
    );

    btn.classList.remove(
      "bg-white",
      "border-slate-200",
      "text-slate-600",
      "hover:border-primary-300",
    );

    const filter = btn.getAttribute("data-filter");

    portfolioItems.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "block";

        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
        }, 50);
      } else {
        item.style.opacity = "0";
        item.style.transform = "scale(0.95)";

        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  });
});

// Phone Modal Logic
const phoneToggles = document.querySelectorAll(".phone-toggle");
const phoneModal = document.getElementById("phoneModal");
const closePhoneModal = document.getElementById("closePhoneModal");
const phoneModalContent = document.getElementById("phoneModalContent");

function openPhoneModal(e) {
  e.preventDefault();

  if (!phoneModal || !phoneModalContent) {
    return;
  }

  phoneModal.classList.remove("hidden");
  phoneModal.classList.add("flex");

  setTimeout(() => {
    phoneModalContent.classList.remove("scale-95", "opacity-0");
    phoneModalContent.classList.add("scale-100", "opacity-100");
  }, 10);
}

function closePhoneModalHandler() {
  if (!phoneModal || !phoneModalContent) {
    return;
  }

  phoneModalContent.classList.remove("scale-100", "opacity-100");
  phoneModalContent.classList.add("scale-95", "opacity-0");

  setTimeout(() => {
    phoneModal.classList.add("hidden");
    phoneModal.classList.remove("flex");
  }, 300);
}

phoneToggles.forEach((link) => {
  link.addEventListener("click", openPhoneModal);
});

if (closePhoneModal) {
  closePhoneModal.addEventListener("click", closePhoneModalHandler);
}

if (phoneModal) {
  phoneModal.addEventListener("click", (e) => {
    if (e.target === phoneModal) {
      closePhoneModalHandler();
    }
  });
}

// Form Handler
async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');

  if (!submitBtn) {
    return;
  }

  const originalHTML = submitBtn.innerHTML;

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  submitBtn.classList.add("opacity-80", "cursor-not-allowed");
  submitBtn.disabled = true;

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbxucvYYE4h3ZZT5wmxtlOAWTICVAAUsPklR2AmalUIzkNcH3bwpvuqxruqDAYKc4IKA/exec";

  try {
    await fetch(scriptURL, {
      method: "POST",
      body: new FormData(form),
    });

    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';

    submitBtn.classList.replace("bg-primary-600", "bg-emerald-600");

    form.reset();
  } catch (error) {
    console.error("Error!", error.message);

    submitBtn.innerHTML =
      '<i class="fas fa-exclamation-triangle"></i> Failed to Send';

    submitBtn.classList.replace("bg-primary-600", "bg-rose-500");
  } finally {
    setTimeout(() => {
      submitBtn.innerHTML = originalHTML;

      submitBtn.classList.remove(
        "bg-emerald-600",
        "bg-rose-500",
        "opacity-80",
        "cursor-not-allowed",
      );

      submitBtn.classList.add("bg-primary-600");

      submitBtn.disabled = false;
    }, 3000);
  }
}

// Make form handler available to HTML
window.handleFormSubmit = handleFormSubmit;

// Testimonial Swiper
const testimonialSwiper = document.querySelector(".testimonial-swiper");

if (testimonialSwiper) {
  new Swiper(".testimonial-swiper", {
    modules: [Pagination, Autoplay],

    loop: true,
    slidesPerView: 1,
    spaceBetween: 32,

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
      },

      1024: {
        slidesPerView: 3,
      },
    },
  });
}
