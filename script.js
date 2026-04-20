const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
const year = document.getElementById("year");
const bookingForm = document.getElementById("bookingForm");
const formStatus = document.getElementById("formStatus");
const submitButton = bookingForm.querySelector('button[type="submit"]');
const galleryCards = document.querySelectorAll(".gallery-card");
const lightbox = document.getElementById("lightbox");
const lightboxBackdrop = document.getElementById("lightboxBackdrop");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

// EmailJS setup: replace with your real IDs from emailjs.com dashboard.
const EMAILJS_PUBLIC_KEY = "r_iucPj-C--tx9tzj";
const EMAILJS_SERVICE_ID = "service_2r1w8f6";
const EMAILJS_TEMPLATE_ID = "template_r0r1js7";
const BOOKING_RECIPIENT_EMAIL = "davidmaboudou@gmail.com";

const galleries = {
  portraits: [
    {
      src: "https://picsum.photos/seed/portrait-01/1600/2000",
      caption: "Golden Hour Glow"
    },
    {
      src: "https://picsum.photos/seed/portrait-02/1600/2000",
      caption: "City Light Portrait"
    },
    {
      src: "https://picsum.photos/seed/portrait-03/1600/2000",
      caption: "Natural Smile"
    },
    {
      src: "https://picsum.photos/seed/portrait-04/1600/2000",
      caption: "Editorial Mood"
    },
    {
      src: "https://picsum.photos/seed/portrait-05/1600/2000",
      caption: "Soft Studio Light"
    },
    {
      src: "https://picsum.photos/seed/portrait-06/1600/2000",
      caption: "Candid Moment"
    },
    {
      src: "https://picsum.photos/seed/portrait-07/1600/2000",
      caption: "Bold Expression"
    },
    {
      src: "https://picsum.photos/seed/portrait-08/1600/2000",
      caption: "Window Light Frame"
    },
    {
      src: "https://picsum.photos/seed/portrait-09/1600/2000",
      caption: "Timeless Headshot"
    },
    {
      src: "https://picsum.photos/seed/portrait-10/1600/2000",
      caption: "Downtown Story"
    },
    {
      src: "https://picsum.photos/seed/portrait-11/1600/2000",
      caption: "Quiet Confidence"
    },
    {
      src: "https://picsum.photos/seed/portrait-12/1600/2000",
      caption: "Film Look Vibes"
    },
    {
      src: "https://picsum.photos/seed/portrait-13/1600/2000",
      caption: "Clean Classic Portrait"
    }
  ],
  sports: [
    {
      src: "assets/sports-custom-1.png",
      caption: "Sports Action"
    },
    {
      src: "assets/sports-lacrosse-3.png",
      caption: "Women's lacrosse — drive to goal"
    },
    {
      src: "assets/sports-lacrosse-7.png",
      caption: "Women's lacrosse — Frostburg in transition"
    },
    {
      src: "assets/sports-softball-handshake.png",
      caption: "Softball — post-game sportsmanship"
    },
    {
      src: "assets/sports-softball-runner.png",
      caption: "Softball — speed on the basepaths"
    },
    {
      src: "assets/sports-baseball-run.png",
      caption: "Baseball — full speed on the bases"
    },
    {
      src: "assets/sports-cheer-stunt.png",
      caption: "Cheer — Frostburg pyramid and toss"
    },
    {
      src: "assets/sports-team-celebration.png",
      caption: "Indoor arena — team celebration"
    },
    {
      src: "assets/sports-track-long-jump.png",
      caption: "Track & field — long jump over the pit"
    },
    {
      src: "assets/sports-field-hockey-celebration.png",
      caption: "Field hockey — post-goal celebration"
    },
    {
      src: "assets/sports-adelphi-lacrosse.png",
      caption: "Men's lacrosse — Adelphi under the lights"
    },
    {
      src: "assets/sports-soccer-celebration.png",
      caption: "Soccer — goal celebration at night"
    },
    {
      src: "assets/sports-field-hockey-selective.png",
      caption: "Field hockey — selective color on the pitch"
    },
    {
      src: "assets/sports-soccer-action.png",
      caption: "Soccer — Frostburg vs Charleston"
    },
    {
      src: "assets/sports-football-action.png",
      caption: "Football — open-field run"
    },
    {
      src: "assets/sports-portrait-bw.png",
      caption: "Courtside portrait — black & white"
    }
  ],
  lifestyle: [
    {
      src: "https://picsum.photos/seed/lifestyle-01/1600/2000",
      caption: "Weekend Walk"
    },
    {
      src: "https://picsum.photos/seed/lifestyle-02/1600/2000",
      caption: "Coffee Run"
    },
    {
      src: "https://picsum.photos/seed/lifestyle-03/1600/2000",
      caption: "City Afternoon"
    },
    {
      src: "https://picsum.photos/seed/lifestyle-04/1600/2000",
      caption: "Natural Laugh"
    },
    {
      src: "https://picsum.photos/seed/lifestyle-05/1600/2000",
      caption: "Quiet Morning"
    },
    {
      src: "https://picsum.photos/seed/lifestyle-06/1600/2000",
      caption: "Downtown Stroll"
    },
    {
      src: "https://picsum.photos/seed/lifestyle-07/1600/2000",
      caption: "Golden Hour Outing"
    },
    {
      src: "https://picsum.photos/seed/lifestyle-08/1600/2000",
      caption: "Everyday Motion"
    },
    {
      src: "https://picsum.photos/seed/lifestyle-09/1600/2000",
      caption: "Weekend Vibes"
    },
    {
      src: "https://picsum.photos/seed/lifestyle-10/1600/2000",
      caption: "Street Side Story"
    },
    {
      src: "https://picsum.photos/seed/lifestyle-11/1600/2000",
      caption: "Soft Light Moment"
    },
    {
      src: "https://picsum.photos/seed/lifestyle-12/1600/2000",
      caption: "Casual Portrait"
    },
    {
      src: "https://picsum.photos/seed/lifestyle-13/1600/2000",
      caption: "Day in Motion"
    }
  ]
};

let currentGallery = [];
let currentIndex = 0;

year.textContent = new Date().getFullYear();

if (window.emailjs && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
  window.emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });
}

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

function showError(name, message) {
  const fieldError = document.querySelector(`.error[data-for="${name}"]`);
  if (fieldError) fieldError.textContent = message;
}

function clearErrors() {
  document.querySelectorAll(".error").forEach((item) => {
    item.textContent = "";
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function renderLightboxImage() {
  const selected = currentGallery[currentIndex];
  if (!selected) return;
  lightboxImage.src = selected.src;
  lightboxCaption.textContent = selected.caption;
}

function openLightbox(galleryName) {
  currentGallery = galleries[galleryName] || [];
  currentIndex = 0;
  if (!currentGallery.length) return;
  renderLightboxImage();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function showNextImage(step) {
  if (!currentGallery.length) return;
  currentIndex = (currentIndex + step + currentGallery.length) % currentGallery.length;
  renderLightboxImage();
}

galleryCards.forEach((card) => {
  card.addEventListener("click", () => {
    openLightbox(card.dataset.gallery);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(card.dataset.gallery);
    }
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxBackdrop.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => showNextImage(-1));
lightboxNext.addEventListener("click", () => showNextImage(1));

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") showNextImage(1);
  if (event.key === "ArrowLeft") showNextImage(-1);
});

bookingForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearErrors();
  formStatus.textContent = "";
  formStatus.className = "form-status";

  const formData = new FormData(bookingForm);
  const values = Object.fromEntries(formData.entries());
  let valid = true;

  if (!values.name.trim()) {
    showError("name", "Please enter your name.");
    valid = false;
  }

  if (!values.email.trim()) {
    showError("email", "Please enter your email.");
    valid = false;
  } else if (!validateEmail(values.email.trim())) {
    showError("email", "Please enter a valid email.");
    valid = false;
  }

  if (!values.service) {
    showError("service", "Please choose a session type.");
    valid = false;
  }

  if (!values.date) {
    showError("date", "Please pick a preferred date.");
    valid = false;
  }

  if (!valid) {
    formStatus.textContent = "Please fix the highlighted fields and try again.";
    formStatus.classList.add("error");
    return;
  }

  if (
    !window.emailjs ||
    EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY" ||
    EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" ||
    EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID"
  ) {
    formStatus.textContent =
      "Booking is almost ready. Add your EmailJS keys in script.js to enable live submissions.";
    formStatus.classList.add("error");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: BOOKING_RECIPIENT_EMAIL,
      from_name: values.name.trim(),
      from_email: values.email.trim(),
      session_type: values.service,
      preferred_date: values.date,
      message: values.message ? values.message.trim() : ""
    });

    formStatus.textContent = "Thanks! Your booking request was sent successfully.";
    formStatus.classList.add("success");
    bookingForm.reset();
  } catch (error) {
    formStatus.textContent =
      "Could not send booking request. Check your EmailJS IDs and template variables, then try again.";
    formStatus.classList.add("error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Booking Request";
  }
});
