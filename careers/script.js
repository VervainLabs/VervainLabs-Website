// ================================
// CONFIG
// ================================

// Replace with your Google Apps Script Web App URL
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby8JPqKlRW_JIcVhBTGaa9O326fGSXrWwh4wWqHfg14g3knjKUkvCKt6dw3iAPvhfZh/exec";


// ================================
// ELEMENTS
// ================================

const form = document.getElementById("applicationForm");
const positionSelect = document.getElementById("position");
const otherPositionGroup = document.getElementById("otherPositionGroup");
const otherPositionInput = document.getElementById("otherPosition");
const submitBtn = document.getElementById("submitBtn");
const statusMessage = document.getElementById("statusMessage");


// ================================
// SHOW OTHER POSITION FIELD
// ================================

positionSelect.addEventListener("change", () => {

  if (positionSelect.value === "Other") {
    otherPositionGroup.classList.remove("hidden");
    otherPositionInput.required = true;
  } else {
    otherPositionGroup.classList.add("hidden");
    otherPositionInput.required = false;
  }
});


// ================================
// FORM SUBMIT
// ================================

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.innerText = "Submitting...";
  statusMessage.innerText = "";

  const formData = new FormData(form);

  const data = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    gender: formData.get("gender"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    linkedin: formData.get("linkedin"),
    github: formData.get("github"),
    resume: formData.get("resume"),
    position: formData.get("position"),
    otherPosition: formData.get("otherPosition"),
    experience: formData.get("experience"),
    portfolio: formData.get("portfolio"),
    message: formData.get("message")
  };

  try {

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.result === "success") {

      statusMessage.style.color = "#4ade80";
      statusMessage.innerText =
        "Application submitted successfully! We will reach out soon.";

      form.reset();

      otherPositionGroup.classList.add("hidden");

    } else {

      statusMessage.style.color = "#ff6b6b";
      statusMessage.innerText =
        "Something went wrong. Please try again.";
    }

  } catch (error) {

    statusMessage.style.color = "#ff6b6b";
    statusMessage.innerText =
      "Submission failed. Check your internet connection.";

    console.error(error);

  } finally {

    submitBtn.disabled = false;
    submitBtn.innerText = "Submit Application";
  }
});


// ================================
// DISABLE RIGHT CLICK
// ================================

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});


// ================================
// DISABLE INSPECT SHORTCUTS
// ================================

document.addEventListener("keydown", (e) => {

  // F12
  if (e.key === "F12") {
    e.preventDefault();
  }

  // Ctrl+Shift+I
  if (
    e.ctrlKey &&
    e.shiftKey &&
    (e.key === "I" || e.key === "i")
  ) {
    e.preventDefault();
  }

  // Ctrl+Shift+J
  if (
    e.ctrlKey &&
    e.shiftKey &&
    (e.key === "J" || e.key === "j")
  ) {
    e.preventDefault();
  }

  // Ctrl+U
  if (
    e.ctrlKey &&
    (e.key === "u" || e.key === "U")
  ) {
    e.preventDefault();
  }
});