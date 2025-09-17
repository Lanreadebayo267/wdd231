// course.mjs
const byuiCourse = {
  code: "CSE 121b",
  name: "JavaScript Language",
  sections: [
    { sectionNum: 1, roomNum: "STC 353", enrolled: 26, days: "TTh", instructor: "Bro T" },
    { sectionNum: 2, roomNum: "STC 347", enrolled: 25, days: "TTh", instructor: "Sis B" }
  ],
  changeEnrollment(sectionNum, enroll = true) {
    const section = this.sections.find(sec => sec.sectionNum == sectionNum);
    if (section) {
      if (enroll) {
        section.enrolled++;
      } else if (section.enrolled > 0) {
        section.enrolled--;
      }
    }
  }
};

export default byuiCourse;
