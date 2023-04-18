const addStudentForm = document.getElementById("add-student-form");
const studentTableBody = document.getElementById("tbody");
let students = [];
function handleSubmit(event) {
  event.preventDefault();

  const name = document.querySelector('input[name="useName"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const phone = document.querySelector('input[name="numbers"]').value;
  const address = document.querySelector('input[name="content"]').value;
  const gender = document.querySelector(
    'input[name="gridRadios"]:checked'
  ).value;
  const student = { name, email, phone, address, gender };
  students.push(student);
  renderStudents();
}
//CREATE
function renderStudents() {
  studentTableBody.innerHTML = "";
  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${i + 1}</th>
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.phone}</td>
      <td>${student.address}</td>
      <td>${student.gender}</td>
      <td>
        <button class="btn btn-success">Update</button>
        <button class="btn btn-danger" data-id="${i}" onclick="deleteStudent(this)">Delete</button>
        </td>
    `;
    studentTableBody.appendChild(row);
  }
}
addStudentForm.addEventListener("submit", handleSubmit);
//DELETE
function deleteStudent(button) {
  const studentIndex = button.getAttribute("data-id");
  students.splice(studentIndex, 1);
  renderStudents();
}

//EDIT
function editStudent(button) {
  const studentIndex = button.getAttribute("data-id");
  const student = students[studentIndex];

  const name = prompt("Hãy nhập tên thay thế", student.name);
  const email = prompt("Hãy nhập email thay thế", student.email);
  const phone = prompt("Hãy nhập số điện thoại thay thếr", student.phone);
  const address = prompt("Hãy nhập địa chỉ thay thế", student.address);
  const gender = prompt("Hãy nhập giới tính thay thế", student.gender);

  students[studentIndex] = { name, email, phone, address, gender };

  renderStudents();
}

function renderStudents() {
  studentTableBody.innerHTML = "";
  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const row = document.createElement("tr");
    row.innerHTML = `
        <th scope="row">${i + 1}</th>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>${student.address}</td>
        <td>${student.gender}</td>
        <td>
          <button class="btn btn-success" data-id="${i}" onclick="editStudent(this)">Edit</button>
          <button class="btn btn-danger" data-id="${i}" onclick="deleteStudent(this)">Delete</button>
        </td>
      `;
    studentTableBody.appendChild(row);
  }
}
//Sắp xếp
const sortButton = document.getElementById("sort-button");
sortButton.addEventListener("click", sortStudentsByName);

function sortStudentsByName() {
  students.sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" })
  );
  renderStudents();
}