document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect form data
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!fullname || !email || !message) {
      status.textContent = "Please fill in all required fields.";
      status.style.color = "red";
      return;
    }

    // Save to localStorage (optional)
    const formData = { fullname, email, phone, message };
    localStorage.setItem("autohubContact", JSON.stringify(formData));

    // Feedback
    status.textContent = "Submitting...";
    status.style.color = "#444";

    // Simulate sending data & redirect
    setTimeout(() => {
      window.location.href = "thank-you.html";
    }, 1000);
  });
});

// ==========================
// FOOTER YEAR + LAST MODIFIED
// ==========================
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastMod").textContent = document.lastModified;