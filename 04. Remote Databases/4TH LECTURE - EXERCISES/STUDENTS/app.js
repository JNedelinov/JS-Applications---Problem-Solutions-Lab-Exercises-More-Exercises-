// AFTER WATCHING THE LAST TWO LECTURES WITH VICTOR LOL

import * as data from './data.js';
import creatingRows from './dom.js';

window.addEventListener('load', () => {

    const loadBtn = document.getElementById('loadStudents');
    loadBtn.addEventListener('click', loadStudents);

    const tbody = document.querySelector('#results>tbody');

    const idInputEl = document.getElementById('id');
    const fNameInputEl = document.getElementById('firstName');
    const lNameInputEl = document.getElementById('lastName');
    const fNumberInputEl = document.getElementById('facultyNumber');
    const gradeInputEl = document.getElementById('grade');
    const addBtn = document.getElementById('addBtn');
    addBtn.addEventListener('click', addStudent)

    async function loadStudents() {
        tbody.innerHTML = '';
        const students = await data.getStudents();
        await students.sort((a, b) => a.ID - b.ID);
        creatingRows(students).forEach(student => {
            tbody.appendChild(student);
        })
    }

    async function addStudent() {
        const newStudent = {
            ID: Number(idInputEl.value),
            firstName: fNameInputEl.value,
            lastName: lNameInputEl.value,
            facultyNumber: fNumberInputEl.value,
            grade: Number(gradeInputEl.value),
        };

        for (const key in newStudent) {
            if (newStudent[key].length === 0) {
                alert('All fields are required!');
                return;
            }
        }

        // проверка дали id-то е отрицателно

        if (newStudent['ID'] < 0) {
            alert('The ID should be a positive integer!');
            return;
        }

        // проверка дали id-то, което user-a се опитва да зададе е уникално

        const studentsData = await data.getStudents();
        for (const obj in studentsData) {
            if (studentsData[obj]['ID'] == newStudent['ID']) {
                alert("The ID should be unique for every student. If you do not know which is the next free ID, just load all students!")
                return;
            }
        }

        // проверка дали оценката е от 2.00 до 6.00

        if (newStudent.grade < 2.00 || newStudent.grade > 6.00) {
            alert('The grade should be in the range [2.00 - 6.00]!');
            return;
        }

        await data.postStudent(newStudent);
        clearAllInputFields();

    }

    function clearAllInputFields() {
        idInputEl.value = '';
        fNameInputEl.value = '';
        lNameInputEl.value = '';
        fNumberInputEl.value = '';
        gradeInputEl.value = '';
        addBtn.value = '';
    }
});