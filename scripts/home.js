const navToggle = document.querySelector("#menuToggle");
const navMenu = document.querySelector("nav ul");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  navToggle.classList.toggle("open");
});

// --- Dynamic Footer Data ---
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// --- Course Data ---
const courses = [
  { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, certificate: "Web and Computer Programming", description: "This course introduces students to programming fundamentals.", technology: ["Python"], completed: false },
  { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, certificate: "Web and Computer Programming", description: "Covers HTML, CSS, and basic web design.", technology: ["HTML", "CSS"], completed: true },
  { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, certificate: "Web and Computer Programming", description: "Organize code using functions and handle errors.", technology: ["Python"], completed: false },
  { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, certificate: "Web and Computer Programming", description: "Learn object-oriented programming concepts.", technology: ["C#"], completed: false },
  { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, certificate: "Web and Computer Programming", description: "Create dynamic, responsive websites using JavaScript.", technology: ["HTML", "CSS", "JavaScript"], completed: true },
  { subject: "WDD", number: 231, title: "Frontend Web Development I", credits: 2, certificate: "Web and Computer Programming", description: "Focus on accessibility, UX, and performance optimization.", technology: ["HTML", "CSS", "JavaScript"], completed: false }
];

// --- Display Courses Dynamically ---
const courseContainer = document.querySelector("#courseContainer");
const totalCreditsEl = document.querySelector("#totalCredits");

function displayCourses(filteredCourses) {
  courseContainer.innerHTML = "";

  filteredCourses.forEach((course) => {
    const card = document.createElement("div");
    card.classList.add("course-card");
    if (course.completed) card.classList.add("completed");

    card.innerHTML = `
      <h3>${course.subject} ${course.number}: ${course.title}</h3>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Technologies:</strong> ${course.technology.join(", ")}</p>
      <p>${course.description}</p>
    `;

    courseContainer.appendChild(card);
  });

  const totalCredits = filteredCourses.reduce((sum, c) => sum + c.credits, 0);
  totalCreditsEl.textContent = `Total Credits: ${totalCredits}`;
}

// --- Filter Buttons ---
document.querySelector("#allBtn").addEventListener("click", () => displayCourses(courses));
document.querySelector("#cseBtn").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === "CSE")));
document.querySelector("#wddBtn").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === "WDD")));

// --- Initialize ---
displayCourses(courses);