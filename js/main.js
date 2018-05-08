/* JS for WATS 3020 Roster Project */

///////////////////////////////////////////////////
//////// TODOs ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Fill in the blanks below to complete each TODO task.                       //
////////////////////////////////////////////////////////////////////////////////

//Created a base class called `Person` that takes the parameters `name`
// and `email` and makes those available as attributes. Used the `constructor()`
// method to break the username from before the `@` symbol in the
// `email` value and to store it on a `this.username` property.
class Person {
    constructor (name, email) {
        this.name = name;
        this.email = email;
        this.username = email.split('@')[0];
    }
}
//Created another class that extends the `Person` class called `Student`.
//Set student class to add a line to the `constructor()` method to set `this.attendance`
//to an empty array.
//
class Student extends Person {
    constructor(name, email) {
        super(name,email);
        this.attendance = [];
    }
    // Created another method on the `Student` class called `calculateAttendance`.
    // To give a percentage of how many days the student was present.

    calculateAttendance(){
            if (this.attendance.length > 0) {
            let counter = 0;
            for (let mark of this.attendance){
                counter = counter + mark;
            }
            let attendancePercentage = counter / this.attendance.length * 100;
            return `${attendancePercentage}%`;
        } else {
            return "0%";
        }
    }
}
//Created class that extends the `Person` class called `Teacher`.

class Teacher extends Person {
    constructor(name, email, honorific){
        super(name, email);
        this.honorific = honorific;
    }
}

//Set up our Course class so we can run the whole roster from it.

class Course {
    constructor(courseCode, courseTitle, courseDescription){
        this.code = courseCode;
        this.title = courseTitle;
        this.description = courseDescription;
        this.teacher = null;
        this.students = [];
    }

    // Created`addStudent()`method that prompts the user for
    // information required to create a new `Student` object (`name`, `email`)
    // then adds the student to the `this.students` Array. 
    // Used `updateRoster()` to update the roster with changes.

    addStudent(){
        let name = prompt('Student Full Name:');
        let email = prompt('Student Email:');
        let newStudent = new Student(name, email);
        this.students.push(newStudent);
        updateRoster(this);
    }

    // Created a method called `setTeacher()` that prompts the user for the
    // information required to create a `Teacher` object (`name`, `email`), 
    // then sets the `this.teacher` property equal to the new `Teacher` object.

    setTeacher(){
        let name = prompt('Teacher Full Name:');
        let email = prompt('Teacher Email:');
        let honorific = prompt('Honorific (e.g. Dr., Prof., Mr., Ms.):');

        this.teacher = new Teacher(name, email, honorific);
        updateRoster(this);
    }

    //Created `markAttendance()` method which accepts a parameter called `username`.
    //Set to retrieve the `Student` object out of the `this.students` array.
    //Defaulted to mark the student present.

markAttendance(username,status='present'){
    let student = this.findStudent(username);
    if (status === 'present'){
        student.attendance.push(1);
    } else {
        student.attendance.push(0);
    }
}

    //////////////////////////////////////////////
    // Methods provided for you -- DO NOT EDIT /////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    findStudent(username){
        // This method provided for convenience. It takes in a username and looks
        // for that username on student objects contained in the `this.students`
        // Array.
        let foundStudent = this.students.find(function(student, index){
            return student.username == username;
        });
        return foundStudent;
    }
}


// Prompt the user for information to create the Course. In order to create a
// `Course` object, you must gather the following information:
//
//Prompted the user for the course code
let courseCode = prompt('Enter the course code (e.g. WATS 3020):', 'TEST 3000'); 

//Prompted the user for the name of the course
let courseTitle = prompt('Course Title:', 'TESTING FOR EVERYONE');

//Prompted the user for the description of the course
let courseDescription = prompt('Course Description:', 'A great course for all.');

//Created a new `Course` object instance called `myCourse` and added in the values provided by the user
let myCourse = new Course(courseCode, courseTitle, courseDescription);

///////////////////////////////////////////////////
//////// Main Script /////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// This script runs the page. You should only edit it if you are attempting a //
// stretch goal. Otherwise, this script calls the functions that you have     //
// created above.                                                             //
////////////////////////////////////////////////////////////////////////////////

let rosterTitle = document.querySelector('#course-title');
rosterTitle.innerHTML = `${myCourse.code}: ${myCourse.title}`;

let rosterDescription = document.querySelector('#course-description');
rosterDescription.innerHTML = myCourse.description;

if (myCourse.teacher){
    let rosterTeacher = document.querySelector('#course-teacher');
    rosterTeacher.innerHTML = `${myCourse.teacher.honorific} ${myCourse.teacher.name}`;
} else {
    let rosterTeacher = document.querySelector('#course-teacher');
    rosterTeacher.innerHTML = "Not Set";
}

let rosterTbody = document.querySelector('#roster tbody');
// Clear Roster Content
rosterTbody.innerHTML = '';

// Create event listener for adding a student.
let addStudentButton = document.querySelector('#add-student');
addStudentButton.addEventListener('click', function(e){
    console.log('Calling addStudent() method.');
    myCourse.addStudent();
})

// Create event listener for adding a teacher.
let addTeacherButton = document.querySelector('#add-teacher');
addTeacherButton.addEventListener('click', function(e){
    console.log('Calling setTeacher() method.');
    myCourse.setTeacher();
})

// Call Update Roster to initialize the content of the page.
updateRoster(myCourse);

function updateRoster(course){
    let rosterTbody = document.querySelector('#roster tbody');
    // Clear Roster Content
    rosterTbody.innerHTML = '';
    if (course.teacher){
        let rosterTeacher = document.querySelector('#course-teacher');
        rosterTeacher.innerHTML = `${course.teacher.honorific} ${course.teacher.name}`;
    } else {
        let rosterTeacher = document.querySelector('#course-teacher');
        rosterTeacher.innerHTML = "Not Set";
    }
    // Populate Roster Content
    for (student of course.students){
        // Create a new row for the table.
        let newTR = document.createElement('tr');

        // Create table cells for each data point and append them to the new row.
        let nameTD = document.createElement('td');
        nameTD.innerHTML = student.name;
        newTR.appendChild(nameTD);

        let emailTD = document.createElement('td');
        emailTD.innerHTML = student.email;
        newTR.appendChild(emailTD);

        let attendanceTD = document.createElement('td');
        attendanceTD.innerHTML = student.calculateAttendance();
        newTR.appendChild(attendanceTD);

        let actionsTD = document.createElement('td');
        let presentButton = document.createElement('button');
        presentButton.innerHTML = "Present";
        presentButton.setAttribute('data-username', student.username);
        presentButton.setAttribute('class', 'present');
        actionsTD.appendChild(presentButton);

        let absentButton = document.createElement('button');
        absentButton.innerHTML = "Absent";
        absentButton.setAttribute('data-username', student.username);
        absentButton.setAttribute('class', 'absent');
        actionsTD.appendChild(absentButton);

        newTR.appendChild(actionsTD);

        // Append the new row to the roster table.
        rosterTbody.appendChild(newTR);
    }
    // Call function to set event listeners on attendance buttons.
    setupAttendanceButtons();
}

function setupAttendanceButtons(){
    // Set up the event listeners for buttons to mark attendance.
    let presentButtons = document.querySelectorAll('.present');
    for (button of presentButtons){
        button.addEventListener('click', function(e){
            console.log(`Marking ${e.target.dataset.username} present.`);
            myCourse.markAttendance(e.target.dataset.username);
            updateRoster(myCourse);
        });
    }
    let absentButtons = document.querySelectorAll('.absent');
    for (button of absentButtons){
        button.addEventListener('click', function(e){
            console.log(`Marking ${e.target.dataset.username} absent.`);
            myCourse.markAttendance(e.target.dataset.username, 'absent');
            updateRoster(myCourse);
        });
    }
}

