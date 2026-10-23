
"use strict";

// MOBILE NAVIGATION
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.textContent = open ? "✕" : "☰";
  menuBtn.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
  });
});



const tutorSelect = document.getElementById("tutor");
const subjectSelect = document.getElementById("subject");

const tutorSubjects = {
  "Ayesha": ["Computer Science"],
  "Nimra": ["English", "Biology"],
  "Ahmad": ["Mathematics", "Physics"],
  "Warda": ["Chemistry"],
  "Iram": ["Urdu", "Pakistan Studies"],
  "Fozia": [
    "Islamiat",
    "Quran with Tajweed",
    "Translation of the Holy Quran"
  ]
};

function updateSubjects() {
  const tutor = tutorSelect.value.trim();
  const subjects = tutorSubjects[tutor] || [];

  subjectSelect.innerHTML =
    '<option value="">Choose a subject</option>';

  subjects.forEach(subject => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectSelect.appendChild(option);
  });

  subjectSelect.disabled = subjects.length === 0;
}

tutorSelect.addEventListener("change", updateSubjects);
updateSubjects();


function updateSubjects() {
  const tutor = tutorSelect.value;
  const subjects = tutorSubjects[tutor] || [];

  subjectSelect.innerHTML =
    '<option value="">Choose a subject</option>';

  subjects.forEach(subject => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectSelect.appendChild(option);
  });

  if (subjects.length === 1) {
    subjectSelect.value = subjects[0];
  }
}

tutorSelect.addEventListener("change", updateSubjects);

document.querySelectorAll("[data-tutor]").forEach(button => {
  button.addEventListener("click", () => {
    tutorSelect.value = button.dataset.tutor;
    updateSubjects();
  });
});

/* CONTACT FORM - AJAX SUBMISSION */

const inquiryForm = document.getElementById("studentInquiryForm");
const formStatus = document.getElementById("formStatus");

if (inquiryForm && formStatus) {
  inquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = inquiryForm.querySelector(
      'button[type="submit"]'
    );

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formStatus.textContent = "Please wait, submitting your inquiry...";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(inquiryForm.action, {
        method: "POST",
        body: new FormData(inquiryForm),
        headers: {
          Accept: "application/json"
        },
        signal: controller.signal
      });

      const result = await response.json();

      if (!response.ok || result.success === false ||
          result.success === "false") {
        throw new Error("Submission failed");
      }

      formStatus.textContent =
        "✓ Thank you! Your inquiry has been submitted successfully.";

      inquiryForm.reset();

      if (typeof updateSubjects === "function") {
        updateSubjects();
      }

    } catch (error) {
      if (error.name === "AbortError") {
        formStatus.textContent =
          "The request is taking too long. Please check your email confirmation or contact us before trying again.";
      } else {
        formStatus.textContent =
          "Unable to confirm submission. Please try again later.";
      }

    } finally {
      clearTimeout(timeout);
      submitButton.disabled = false;
      submitButton.textContent = "Send My Inquiry ↗";
    }
  });
}
document.getElementById("year").textContent =
  new Date().getFullYear();

// IMAGE FALLBACK
document.querySelectorAll(".teacher-photo img").forEach(img => {
  img.addEventListener("error", () => {
    img.style.display = "none";

    const placeholder = document.createElement("div");
    placeholder.textContent = "✦";
    placeholder.style.cssText = `
      display:grid;
      place-items:center;
      height:100%;
      font-size:80px;
      color:#493b94;
    `;

    img.parentElement.appendChild(placeholder);
  });
});
