// output.mjs
export function setTitle(course) {
  const title = document.querySelector("#courseName");
  title.textContent = `${course.code}: ${course.name}`;
}

export function renderSections(sections) {
  const sectionTable = document.querySelector("#sections");
  sectionTable.innerHTML = sections
    .map(sec =>
      `<tr>
        <td>${sec.sectionNum}</td>
        <td>${sec.roomNum}</td>
        <td>${sec.enrolled}</td>
        <td>${sec.days}</td>
        <td>${sec.instructor}</td>
      </tr>`
    )
    .join("");
}
