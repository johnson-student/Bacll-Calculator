const scientBtn = document.querySelector(".scient-btn");
const socailBtn = document.querySelector(".socail-btn");
const scientForm = document.querySelector(".scient-form");
const socailForm = document.querySelector(".socail-form");
const calculateBtns = document.querySelectorAll(".calculate-btn");
const displayResult = document.querySelector(".display-result");
const alertError = document.querySelector(".alert-error");
const alertError2 = document.querySelector(".alert-error2");
const subjectGrade = document.querySelector(".subject-grade");
const backBtn = document.querySelector(".back-btn");

scientBtn.addEventListener("click", () => activateBtn(scientBtn, socailBtn , scientForm , socailForm));
socailBtn.addEventListener("click", () => activateBtn(socailBtn, scientBtn , socailForm , scientForm));

function activateBtn(activeBtn, inactiveBtn, activeForm, inactiveForm) {
    if (!activeBtn.classList.contains("active-btn")) { 
        activeBtn.classList.add("active-btn");
        inactiveBtn.classList.remove("active-btn");

        activeForm.classList.remove("inactive-form");
        inactiveForm.classList.add("inactive-form");
        displayResult.style.display = "none";
    }
}

const subjects = [
        document.querySelectorAll(".subject-1"),
        document.querySelectorAll(".subject-2"),
        document.querySelectorAll(".subject-3"),
        document.querySelectorAll(".subject-4"),
        document.querySelectorAll(".subject-5"),
        document.querySelectorAll(".subject-6"),
        document.querySelectorAll(".subject-7"),
    ];
    
calculateBtns.forEach((btn, i) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const values = getValues(i);
    const isSocial = socailBtn.classList.contains("active-btn");
    if (!validateInputs(values, isSocial)) {
      if(isSocial){
        alertError2.style.display = "block"
      }else{
        alertError.style.display = "block"
      }
      return;
    }
    alertError.textContent ="";
    alertError2.textContent="";
    socailForm.classList.add("inactive-form");
    scientForm.classList.add("inactive-form");
    
    displayResult.style.display = "block";

    const total = calculateScore(values);
    updateUI(total);

    //======== From AI =======================================
    const subjectsNames = isSocial ? socialSubjects : scienceSubjects;

    const subjectGrades = values.map((v, idx) =>
      getSubjectGrade(parseInt(v, 10), idx, isSocial)
    );

    subjectGrade.innerHTML = subjectGrades
      .map(
        (g, idx) => `
        <div>
          <span>${subjectsNames[idx]}:</span>
          <strong>${g}</strong>
        </div>`
      )
      .join("");
  });
///====================================================

});

function getValues(i) {
  return subjects.map((subj) => subj[i].value.trim());
}

function validateInputs(values, isSocial) {
  const fullMarks = isSocial
    ? [125, 75, 75, 75, 75, 50, 50] // Khmer 125, Math 75, Geo 75, History 75, Civics 75, Elective 50, Foreign 50
    : [75, 125, 75, 75, 75, 50, 50]; // Khmer 75, Math 125, Physics 75, Chemistry 75, Biology 75, Elective 50, Foreign 50

  for (let i = 0; i < values.length; i++) {
    const v = values[i];

    if (v === "" || isNaN(v)){
      if(isSocial){
        alertError2.textContent = `❌ សូមបំពេញពិន្ទុអោយគ្រប់មុខវិជ្ជាប្រូ `;
      }else{
        alertError.textContent = `❌ សូមបំពេញពិន្ទុអោយគ្រប់មុខវិជ្ជាប្រូ `;
      }
      return false;
    } 
    
      
    const num = parseInt(v, 10);
    if (num < 0 || num > fullMarks[i]) {
      if(isSocial){
        alertError2.textContent = `❌ វិនិច្ឆ័យ ${isSocial ? socialSubjects[i] : scienceSubjects[i]} ត្រូវនៅចន្លោះ 0 ដល់ ${fullMarks[i]}!`;
      }else{
        alertError.textContent = `❌ វិនិច្ឆ័យ ${isSocial ? socialSubjects[i] : scienceSubjects[i]} ត្រូវនៅចន្លោះ 0 ដល់ ${fullMarks[i]}!`;
      }
      return false;
    }
  }
  return true;
}

function calculateScore(values) {
  let nums = values.map((v) => parseInt(v, 10) || 0);
  let engPoint = nums[6] > 25 ? nums[6] - 25 : 0;
  return nums.slice(0, 6).reduce((a, b) => a + b, 0) + engPoint;
}

function updateUI(total) {
  const totalScore = document.querySelector(".total-score");
  const grade = document.querySelector(".grade");
  const finalResult = document.querySelector(".result");
  const feedback = document.querySelector(".comment");

  const passed = total > 237;
  totalScore.textContent = total;
  grade.textContent = getGrade(total); // TODO: make grading logic later
  finalResult.textContent = passed ? "ជាប់" : "ធ្លាក់";
  feedback.textContent = passed
    ? "សូមអបអរសាទរ! អ្នកបានប្រឡងជាប់។"
    : "kdmv trv twer oy ban";
    if(!passed){
      grade.style.color = "red"
      finalResult.style.color = "red"
      feedback.style.color = "red"
    }else{
      grade.style.color = "green"
      finalResult.style.color = "green"
      feedback.style.color = "green"
    }
}

function getGrade(total) {
    if (total >= 427) return "A";
    if (total >= 380) return "B";
    if (total >= 332) return "C";
    if (total >= 286) return "D";
    if (total >= 237) return "E";
    return "F";
}

backBtn.addEventListener("click", () => {
    const isScience = scientBtn.classList.contains("active-btn");
    if(isScience){
      scientForm.classList.remove("inactive-form");
    }else{
      socailForm.classList.remove("inactive-form");
    }
    displayResult.style.display = "none";
});

//============ AI ==============

const scienceSubjects = [
  "អក្សរសាស្ត្រ​ខ្មែរ",
  "គណិតវិទ្យា",
  "រូបវិទ្យា",
  "គីមីវិទ្យា",
  "ជីវវិទ្យា",
  "មុខវិជ្ជាជម្រើស",
  "ភាសាបរទេស"
];

const socialSubjects = [
  "អក្សរសាស្ត្រ​ខ្មែរ",
  "គណិតវិទ្យា",
  "ភូមិវិទ្យា",
  "ប្រវត្តិវិទ្យា",
  "សីលធម៌-ពលរដ្ឋ",
  "មុខវិជ្ជាជម្រើស",
  "ភាសាបរទេស"
];

// ================= Subject Grade Logic =================
function getSubjectGrade(score, subjectIndex,isSocial) {
  if (isSocial) {
    const gradeRanges = [
      { A:[112,125], B:[100,111], C:[87,99], D:[75,86], E:[62,74], F:[0,61] }, // Khmer 125
      { A:[67,75], B:[60,66], C:[52,59], D:[45,51], E:[37,44], F:[0,36] },    // Math 75
      { A:[67,75], B:[60,66], C:[52,59], D:[45,51], E:[37,44], F:[0,36] },    // Foreign
      { A:[67,75], B:[60,66], C:[52,59], D:[45,51], E:[37,44], F:[0,36] },    // History
      { A:[67,75], B:[60,66], C:[52,59], D:[45,51], E:[37,44], F:[0,36] },    // Geography
      { A:[45,50], B:[40,44], C:[35,39], D:[30,34], E:[25,29], F:[0,24] },    // Social studies
      { A:[45,50], B:[40,44], C:[35,39], D:[30,34], E:[25,29], F:[0,24] }     // Second foreign
    ];
    const ranges = gradeRanges[subjectIndex];
    for (let grade in ranges) {
      const [min, max] = ranges[grade];
      if (score >= min && score <= max) return grade;
    }
    return "F";
  }

  // Science
  const gradeRanges = [
    { A:[67,75], B:[60,66], C:[52,59], D:[45,51], E:[37,44], F:[0,36] },     // Khmer 75
    { A:[112,125], B:[100,111], C:[87,99], D:[75,86], E:[62,74], F:[0,61] }, // Math 125
    { A:[67,75], B:[60,66], C:[52,59], D:[45,51], E:[37,44], F:[0,36] },     // Foreign
    { A:[67,75], B:[60,66], C:[52,59], D:[45,51], E:[37,44], F:[0,36] },     // Chemistry
    { A:[67,75], B:[60,66], C:[52,59], D:[45,51], E:[37,44], F:[0,36] },     // Biology
    { A:[45,50], B:[40,44], C:[35,39], D:[30,34], E:[25,29], F:[0,24] },     // Social studies
    { A:[45,50], B:[40,44], C:[35,39], D:[30,34], E:[25,29], F:[0,24] }      // Second foreign
  ];
  const ranges = gradeRanges[subjectIndex];
  for (let grade in ranges) {
    const [min, max] = ranges[grade];
    if (score >= min && score <= max) return grade;
  }
  return "F";
}
//========================== AI =======================================