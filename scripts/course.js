// Sample course data (you can expand this as needed)
const courses = [
  {
    code: "WDD130",
    name: "Web Fundamentals",
    credits: 2,
    category: "wdd",
    completed: true,
    description: "An introduction to the basics of web development including HTML and CSS."
  },
  {
    code: "WDD131",
    name: "Dynamic Web Fundamentals",
    credits: 2,
    category: "wdd",
    completed: false,
    description: "Covers responsive design, media queries, and JavaScript basics."
  },
  {
    code: "CSE111",
    name: "Programming with Functions",
    credits: 4,
    category: "cse",
    completed: true,
    description: "Introduces programming concepts using Python with a focus on functions."
  },
  {
    code: "CSE210",
    name: "Programming with Classes",
    credits: 4,
    category: "cse",
    completed: false,
    description: "Object-oriented programming principles in Python including classes and inheritance."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const coursesDiv = document.getElementById("courses");
  const totalCredits = document.getElementById("totalCredits");
  const courseDetails = document.getElementById("course-details");

  // Show modal with course details
  function displayCourseDetails(course) {
    courseDetails.innerHTML = `
      <button id="closeModal">❌</button>
      <h2>${course.code}</h2>
      <h3>${course.name}</h3>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Status:</strong> ${course.completed ? "Completed ✅" : "In Progress 🚀"}</p>
      <p>${course.description}</p>
    `;
    courseDetails.showModal();

    // close button
    document.getElementById("closeModal").addEventListener("click", () => {
      courseDetails.close();
    });

    // click outside to close
    courseDetails.addEventListener("click", (e) => {
      const rect = courseDetails.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        courseDetails.close();
      }
    });
  }

  // Display filtered courses
  function displayCourses(filter) {
    coursesDiv.innerHTML = "";

    const filtered = courses.filter(
      (course) => filter === "all" || course.category === filter
    );

    filtered.forEach((course) => {
      const card = document.createElement("div");
      card.classList.add("course-card");
      if (course.completed) card.classList.add("completed");

      card.innerHTML = `
        <div class="course-summary">
          ${course.code}: ${course.name} (${course.credits} credits)
        </div>
      `;

      // click card → show modal
      card.addEventListener("click", () => displayCourseDetails(course));
      coursesDiv.appendChild(card);
    });

    const total = filtered.reduce((acc, c) => acc + (c.credits || 0), 0);
    totalCredits.textContent = total;
  }

  // filter buttons
  document.getElementById("all").addEventListener("click", () => displayCourses("all"));
  document.getElementById("wdd").addEventListener("click", () => displayCourses("wdd"));
  document.getElementById("cse").addEventListener("click", () => displayCourses("cse"));

  // default load
  displayCourses("all");
});
