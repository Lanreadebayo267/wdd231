// Example course data (add description for interactivity)
const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 3, category: "wdd", completed: true, description: "Introduction to web technologies, HTML, CSS, and responsive design." },
  { code: "CSE111", name: "Programming with Functions", credits: 3, category: "cse", completed: true, description: "Python programming with functions, conditionals, loops, and testing." },
  { code: "WDD231", name: "Web Frontend Development I", credits: 3, category: "wdd", completed: false, description: "Modern frontend development with JavaScript, accessibility, and responsive layouts." }
];

document.addEventListener("DOMContentLoaded", () => {
  const coursesDiv = document.getElementById("courses");
  const totalCredits = document.getElementById("totalCredits");

  function displayCourses(filter) {
    coursesDiv.innerHTML = "";

    const filtered = courses.filter(course => filter === "all" || course.category === filter);

    filtered.forEach(course => {
      const card = document.createElement("div");
      card.classList.add("course-card");
      if (course.completed) card.classList.add("completed");

      // summary line
      const summary = document.createElement("div");
      summary.classList.add("course-summary");
      summary.textContent = `${course.code}: ${course.name} (${course.credits} credits)`;
      
      // expand icon
      const toggle = document.createElement("span");
      toggle.classList.add("toggle");
      toggle.textContent = "+";
      summary.appendChild(toggle);

      // hidden details
      const details = document.createElement("div");
      details.classList.add("course-details");
      details.innerHTML = `
        <p>${course.description}</p>
        <p><strong>Status:</strong> ${course.completed ? "Completed ✅" : "In Progress 🚀"}</p>
      `;

      // toggle functionality
      summary.addEventListener("click", () => {
        details.classList.toggle("open");
        toggle.textContent = details.classList.contains("open") ? "−" : "+";
      });

      card.appendChild(summary);
      card.appendChild(details);
      coursesDiv.appendChild(card);
    });

    const total = filtered.reduce((acc, c) => acc + (c.credits || 0), 0);
    totalCredits.textContent = total;
  }

  document.getElementById("all").addEventListener("click", () => displayCourses("all"));
  document.getElementById("wdd").addEventListener("click", () => displayCourses("wdd"));
  document.getElementById("cse").addEventListener("click", () => displayCourses("cse"));

  displayCourses("all");
});
