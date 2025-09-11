// Example course data (add or remove courses and set completed true/false)
const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 3, category: "wdd", completed: true },
  { code: "CSE111", name: "Programming with Functions", credits: 3, category: "cse", completed: true },
  { code: "WDD231", name: "Web Frontend Development I", credits: 3, category: "wdd", completed: false }
];

document.addEventListener("DOMContentLoaded", () => {
  const coursesDiv = document.getElementById("courses");
  const totalCredits = document.getElementById("totalCredits");

  function displayCourses(filter) {
    coursesDiv.innerHTML = "";

    // filter the courses to be displayed
    const filtered = courses.filter(course => filter === "all" || course.category === filter);

    // create course elements
    filtered.forEach(course => {
      const div = document.createElement("div");
      div.textContent = `${course.code}: ${course.name} (${course.credits} credits)`;
      if (course.completed) {
        div.classList.add("completed");
        const badge = document.createElement("span");
        badge.textContent = " ✓ completed";
        badge.setAttribute("aria-hidden", "true");
        badge.style.marginLeft = "0.5rem";
        div.appendChild(badge);
      }
      coursesDiv.appendChild(div);
    });

    // total calculated with reduce (required by rubric)
    const total = filtered.reduce((acc, c) => acc + (c.credits || 0), 0);
    totalCredits.textContent = total;
  }

  document.getElementById("all").addEventListener("click", () => displayCourses("all"));
  document.getElementById("wdd").addEventListener("click", () => displayCourses("wdd"));
  document.getElementById("cse").addEventListener("click", () => displayCourses("cse"));

  // Default load
  displayCourses("all");
});
