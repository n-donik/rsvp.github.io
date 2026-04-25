// Paste your deployed Apps Script Web App URL below.
// Example: https://script.google.com/macros/s/AKfycbx.../exec
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxbcU1b5dhr-oKns_Zcb9_J5YGa9qqUN8qCGCyKGj5y-d4QotIGCVc8XLPHo1BoWPS0/exec";

const form = document.getElementById("rsvpForm");
const nameInput = document.getElementById("name");
const peopleInput = document.getElementById("people");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");
const inviteImage = document.getElementById("inviteImage");
const imageFallback = document.getElementById("imageFallback");

inviteImage.addEventListener("error", () => {
  inviteImage.hidden = true;
  imageFallback.hidden = false;
});

function setMessage(text, type = "") {
  message.textContent = text;
  message.className = `message ${type}`.trim();
}

function validate(name, people) {
  if (!name) return "Please enter your name.";
  if (!Number.isInteger(people) || people < 1) return "Number of people must be at least 1.";
  return "";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setMessage("");

  const name = nameInput.value.trim();
  const people = Number.parseInt(peopleInput.value, 10);
  const error = validate(name, people);

  if (error) {
    setMessage(error, "error");
    return;
  }

  if (!WEB_APP_URL) {
    setMessage("Set WEB_APP_URL in script.js before submitting.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  try {
    const body = new URLSearchParams({
      name,
      people: String(people),
    });

    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    if (result.status !== "success") {
      throw new Error(result.message || "Failed to save RSVP.");
    }

    setMessage("Thank you! Your RSVP was submitted.", "ok");
    form.reset();
  } catch (err) {
    console.error(err);
    setMessage("Could not submit RSVP. Please try again.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit RSVP";
  }
});
