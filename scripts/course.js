// Example course data
const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 3, category: "wdd" },
  { code: "CSE111", name: "Programming with Functions", credits: 3, category: "cse" },
  { code: "WDD231", name: "Web Frontend Development I", credits: 3, category: "wdd" }
];

document.addEventListener("DOMContentLoaded", () => {
  const coursesDiv = document.getElementById("courses");
  const totalCredits = document.getElementById("totalCredits");

  function displayCourses(filter) {
    coursesDiv.innerHTML = "";
    let total = 0;

    courses.forEach(course => {
      if (filter === "all" || course.category === filter) {
        const div = document.createElement("div");
        div.textContent = `${course.code}: ${course.name} (${course.credits} credits)`;
        coursesDiv.appendChild(div);
        total += course.credits;
      }
    });

    totalCredits.textContent = total;
  }

  document.getElementById("all").addEventListener("click", () => displayCourses("all"));
  document.getElementById("wdd").addEventListener("click", () => displayCourses("wdd"));
  document.getElementById("cse").addEventListener("click", () => displayCourses("cse"));

  // Default load
  displayCourses("all");
});
