// sections.mjs
export function setSectionSelection(sections) {
  const sectionSelect = document.querySelector("#sectionNumber");
  sectionSelect.innerHTML = ""; // clear first
  sections.forEach(sec => {
    let option = document.createElement("option");
    option.value = sec.sectionNum;
    option.textContent = sec.sectionNum;
    sectionSelect.appendChild(option);
  });
}
